# frozen_string_literal: true

module Playground
  # Filters playground props before they reach pb_rails.
  #
  # Trust rules:
  # - Only schema-defined props for the Rails platform are kept
  # - html_options / data / aria / style are never forwarded
  # - Code-like playground values are dropped
  class PropFilter
    BLOCKED_PROP_NAMES = %w[
      html_options
      htmlOptions
      data
      aria
      style
    ].freeze

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

        converted = deep_convert(value)
        next if converted.nil?

        merged[camel_to_snake(camel_key).to_sym] = converted
      end
      merged
    end

    def blocked_prop_name?(name)
      snaked = camel_to_snake(name)
      BLOCKED_PROP_NAMES.include?(name) || BLOCKED_PROP_NAMES.include?(snaked)
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

    def playground_code_expression?(value)
      value.is_a?(Hash) && value.key?("__playgroundCode")
    end

    def deep_convert(value)
      case value
      when Hash
        if playground_code_expression?(value)
          nil
        else
          value.transform_keys { |key| camel_to_snake(key.to_s).to_sym }
               .transform_values { |nested| deep_convert(nested) }
        end
      when Array
        value.map { |item| deep_convert(item) }
      else
        value
      end
    end

    def kit_prop_definitions
      @kit_prop_definitions ||= (kit_schema || {}).fetch("props", {})
    end

    def global_prop_definitions
      @global_prop_definitions ||= (global_props_schema || {}).fetch("props", {})
    end

    def kit_uses_global_props?
      kit_schema.present? && kit_schema["globalProps"] == true
    end

    def kit_schema
      @kit_schema ||= load_json(::Playbook.kit_path(@kit_name, "", "kit.schema.json"))
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
