# frozen_string_literal: true

module PlaybookMcp
  class Validator
    Result = Struct.new(:ok?, :errors, keyword_init: true) do
      def self.success
        new(ok?: true, errors: [])
      end

      def self.failure(errors)
        new(ok?: false, errors: Array(errors))
      end
    end

    def initialize(store: SchemaStore.instance)
      @store = store
    end

    def validate_kit!(kit:, props: {}, children: nil)
      errors = []
      kit = kit.to_s

      begin
        schema = @store.schema_for(kit)
      rescue ValidationError => e
        return Result.failure([e.message])
      end

      errors << "Kit '#{kit}' does not support the rails render path" unless (schema["platforms"] || []).include?("rails")

      camel_props = Props.deep_stringify_keys(props || {})
      errors.concat(validate_props(schema, camel_props))
      errors.concat(validate_conditionals(kit, camel_props))

      errors << "Kit '#{kit}' does not allow HTML children" if children.present? && !HtmlSanitizer.children_allowed?(kit)

      max_bytes = Rails.application.config.playbook_mcp.max_props_bytes
      size = Props.byte_size(camel_props) + children.to_s.bytesize
      errors << "Payload exceeds max size of #{max_bytes} bytes" if size > max_bytes

      errors.empty? ? Result.success : Result.failure(errors)
    end

    def validate_layout!(items:)
      errors = []
      Array(items).each_with_index do |item, index|
        item = item.transform_keys(&:to_sym) if item.is_a?(Hash)
        kit = item[:kit] || item["kit"]
        props = item[:props] || item["props"] || {}
        children = item[:children] || item["children"]
        result = validate_kit!(kit: kit, props: props, children: children)
        next if result.ok?

        result.errors.each { |err| errors << "items[#{index}]: #{err}" }
      end
      errors << "layout items must not be empty" if Array(items).empty?
      errors.empty? ? Result.success : Result.failure(errors)
    end

  private

    def validate_props(schema, camel_props)
      errors = []
      prop_defs = schema["props"] || {}
      global = @store.global_props["props"] || {}

      camel_props.each do |key, value|
        definition = prop_defs[key] || (schema["globalProps"] ? global[key] : nil)
        unless definition
          errors << "Unknown prop '#{key}' for #{schema['name']}"
          next
        end

        platforms = definition["platforms"]
        errors << "Prop '#{key}' is not available on rails (platforms: #{platforms.join(', ')})" if platforms && !platforms.include?("rails")

        errors.concat(validate_type(key, value, definition))
      end

      errors
    end

    def validate_type(key, value, definition)
      type = definition["type"]
      case type
      when "boolean"
        return ["Prop '#{key}' must be a boolean"] unless [true, false].include?(value)
      when "number", "numeric"
        return ["Prop '#{key}' must be a number"] unless value.is_a?(Numeric)
      when "enum"
        values = definition["values"] || []
        return ["Prop '#{key}' must be one of #{values.inspect}"] unless values.map(&:to_s).include?(value.to_s) || value.nil?
      when "string"
        return ["Prop '#{key}' must be a string"] unless value.nil? || value.is_a?(String)
      when "function"
        return ["Prop '#{key}' is a function and cannot be rendered server-side"]
      end
      []
    end

    def validate_conditionals(kit, camel_props)
      playground = @store.playground_for(kit)
      return [] unless playground

      conditionals = playground["conditionals"] || {}
      errors = []

      conditionals.each do |prop_name, rule|
        next unless camel_props.key?(prop_name)

        case rule
        when Hash
          if rule["requires"].is_a?(String)
            required = rule["requires"]
            errors << "Prop '#{prop_name}' requires '#{required}' to be set" unless present?(camel_props[required])
          elsif rule["requires"].is_a?(Hash)
            rule["requires"].each do |req_key, req_val|
              errors << "Prop '#{prop_name}' requires #{req_key}=#{req_val.inspect} (got #{camel_props[req_key].inspect})" unless camel_props[req_key].to_s == req_val.to_s
            end
          end
        when String
          errors << "Prop '#{prop_name}' requires '#{rule}' to be set" unless present?(camel_props[rule])
        end
      end

      errors
    end

    def present?(value)
      !value.nil? && !(value.respond_to?(:empty?) && value.empty?)
    end
  end
end
