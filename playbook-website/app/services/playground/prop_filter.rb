# frozen_string_literal: true

module Playground
  # Filters playground props before they reach pb_rails.
  #
  # Trust rules:
  # - Only schema-defined props for the Rails platform are kept
  # - html_options / data / aria / style are never forwarded
  # - on_error is never forwarded (rendered as an inline JS handler, e.g. Image)
  # - Code-like playground values are dropped
  # - ISO date strings for schema `Date` props become Date / DateTime objects
  # - icon / custom_icon values that look like URLs or paths are dropped (SSRF defense)
  class PropFilter
    BLOCKED_PROP_NAMES = %w[
      html_options
      htmlOptions
      data
      aria
      style
      on_error
      onError
    ].freeze

    ICON_SOURCE_KEYS = %w[
      icon
      custom_icon
      customIcon
    ].freeze

    # Keep in sync with ISO_DATE_PATTERN in RailsCodeGenerator.ts.
    ISO_DATE = /\A(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(?:Z|[+-](\d{2}):?(\d{2}))?)?\z/

    def self.filter_kit_and_globals(kit_name:, props:, global_props: {})
      new(kit_name: kit_name).filter_kit_and_globals(props: props, global_props: global_props)
    end

    def self.filter_child_props(kit_name:, props:)
      new(kit_name: kit_name).filter_child_props(props)
    end

    def initialize(kit_name:)
      @kit_name = kit_name.to_s
    end

    def filter_kit_and_globals(props:, global_props: {})
      merged = filter_against(props, kit_prop_definitions)
      if kit_uses_global_props?
        filter_against(global_props, global_prop_definitions).each do |key, value|
          merged[key] = value
        end
      end
      merged
    end

    # Nested JSX/ERB children send one props hash that may include global props.
    def filter_child_props(props)
      merged = filter_against(props, kit_prop_definitions)
      if kit_uses_global_props?
        filter_against(props, global_prop_definitions).each do |key, value|
          merged[key] = value unless merged.key?(key)
        end
      end
      merged
    end

  private

    def filter_against(source, definitions)
      return {} unless source.is_a?(Hash)

      merged = {}
      source.each do |key, value|
        camel_key = key.to_s
        next if blocked_prop_name?(camel_key)

        definition = definition_for(definitions, camel_key)
        next if definition.blank?
        next unless prop_for_rails?(definition)
        next if unsupported_value?(value)
        next if unsafe_icon_source?(camel_key, value)

        converted = date_prop?(definition) ? convert_iso_date(value) : deep_convert(value)
        next if converted.nil?

        merged[camel_to_snake(camel_key).to_sym] = converted
      end
      merged
    end

    def blocked_prop_name?(name)
      snaked = camel_to_snake(name)
      BLOCKED_PROP_NAMES.include?(name) || BLOCKED_PROP_NAMES.include?(snaked)
    end

    def icon_source_key?(name)
      snaked = camel_to_snake(name)
      ICON_SOURCE_KEYS.include?(name) || ICON_SOURCE_KEYS.include?(snaked)
    end

    def unsafe_icon_source?(key, value)
      return false unless icon_source_key?(key)

      case value
      when String
        unsafe_icon_string?(value)
      when Array
        value.any? { |item| item.is_a?(String) && unsafe_icon_string?(item) }
      else
        false
      end
    end

    def unsafe_icon_string?(value)
      trimmed = value.to_s.strip
      return true if trimmed.blank?
      return true if trimmed.include?("://")
      return true if trimmed.start_with?("|", "/", "~", ".", "\\")
      return true if trimmed.include?("..")
      return true if trimmed.include?("/") || trimmed.include?("\\")
      return true if trimmed.match?(%r{\A[A-Za-z]:[\\/]})
      return true if trimmed.downcase.include?(".svg")

      false
    end

    def definition_for(definitions, key)
      return definitions[key] if definitions.key?(key)

      camelized = snake_to_camel(key)
      return definitions[camelized] if definitions.key?(camelized)

      definitions[camel_to_snake(key)]
    end

    def prop_for_rails?(definition)
      platforms = definition["platforms"]
      platforms.blank? || platforms.include?("rails")
    end

    def unsupported_value?(value)
      return true if playground_code_expression?(value)

      if value.is_a?(String)
        trimmed = value.strip
        return true if trimmed.include?("=>") || trimmed.start_with?("function")
      end

      false
    end

    # Kit schema `Date` props: the playground sends ISO strings, but Rails kits
    # typed with Playbook::Props::Date only accept Date objects. Mirrors the
    # Date.parse / DateTime.parse emitted by RailsCodeGenerator.ts.
    def date_prop?(definition)
      definition["type"].to_s.downcase.match?(/\bdate\b/)
    end

    # Invalid ISO dates (e.g. 2026-02-30, 12:60) are dropped. The code generator
    # applies the same check and omits them, so copied ERB never raises Date::Error.
    def convert_iso_date(value)
      return deep_convert(value) unless value.is_a?(String)

      trimmed = value.strip
      match = ISO_DATE.match(trimmed)
      return value unless match
      return nil unless valid_iso_parts?(match)

      match[4] ? ::DateTime.iso8601(trimmed) : ::Date.iso8601(trimmed)
    rescue ::Date::Error
      nil
    end

    def valid_iso_parts?(match)
      year, month, day, hour, minute, second, offset_hour, offset_minute = match.captures.map { |part| part&.to_i }

      ::Date.valid_date?(year, month, day) &&
        (hour.nil? || hour < 24) && (minute.nil? || minute < 60) && (second.nil? || second < 60) &&
        (offset_hour.nil? || offset_hour < 24) && (offset_minute.nil? || offset_minute < 60)
    end

    def playground_code_expression?(value)
      value.is_a?(Hash) && value.key?("__playgroundCode")
    end

    def deep_convert(value)
      case value
      when Hash
        if playground_code_expression?(value)
          nil
        else
          # to_hash: request params arrive as HashWithIndifferentAccess, which keeps
          # string keys through transform_keys; nested kits (e.g. Avatar) need symbols.
          value.to_hash.each_with_object({}) do |(key, nested), converted|
            converted[camel_to_snake(key.to_s).to_sym] = deep_convert(nested)
          end
        end
      when Array
        value.map { |item| deep_convert(item) }
      else
        value
      end
    end

    def kit_prop_definitions
      @kit_prop_definitions ||= begin
        schema_props = kit_schema&.fetch("props", nil)
        if schema_props.present?
          schema_props
        else
          # Compound kits (flex/flex_item, card/card_header, …) have no
          # kit.schema.json under pb_#{path}/ — fall back to the Ruby kit class.
          kit_class_prop_definitions
        end
      end
    end

    def kit_class_prop_definitions
      klass = Playbook::KitResolver.resolve(@kit_name)
      return {} unless klass.respond_to?(:props)

      klass.props.each_with_object({}) do |(name, _definition), definitions|
        # Schema-shaped stub so definition_for / prop_for_rails? keep working.
        # KitBase already includes global props on the class.
        definitions[snake_to_camel(name.to_s)] = { "platforms" => %w[rails react] }
      end
    end

    def global_prop_definitions
      @global_prop_definitions ||= (global_props_schema || {}).fetch("props", {})
    end

    def kit_uses_global_props?
      # Class-prop fallback already includes KitBase globals — don't double-merge.
      return false if kit_schema.blank?

      kit_schema["globalProps"] == true
    end

    def kit_schema
      return @kit_schema if defined?(@kit_schema)

      # Root kits: pb_flex/kit.schema.json. Compound paths like flex/flex_item
      # resolve to a non-existent pb_flex/flex_item/kit.schema.json.
      @kit_schema = load_json(::Playbook.kit_path(@kit_name, "", "kit.schema.json"))
    end

    def global_props_schema
      @global_props_schema ||= load_json(
        Playbook::Engine.root.join("app/pb_kits/playbook/utilities/global-props.schema.json")
      ) || {}
    end

    def load_json(path)
      return nil unless path.respond_to?(:exist?) && path.exist?

      JSON.parse(path.read)
    rescue JSON::ParserError
      nil
    end

    def camel_to_snake(name)
      name
        .to_s
        .gsub(/([a-z0-9])([A-Z])/, '\1_\2')
        .tr("-", "_")
        .downcase
    end

    def snake_to_camel(name)
      parts = name.to_s.split("_")
      return name.to_s if parts.empty?

      parts[0] + parts[1..].map(&:capitalize).join
    end
  end
end
