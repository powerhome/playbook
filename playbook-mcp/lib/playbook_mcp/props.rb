# frozen_string_literal: true

module PlaybookMcp
  module Props
  module_function

    # AI schemas use camelCase; Playbook Ruby kits expect snake_case symbols.
    def to_kit_props(raw)
      deep_transform(raw) { |key| key.to_s.underscore.to_sym }
    end

    def deep_stringify_keys(raw)
      deep_transform(raw, &:to_s)
    end

    def byte_size(raw)
      JSON.generate(raw || {}).bytesize
    rescue
      0
    end

    def deep_transform(value, &block)
      case value
      when Hash
        value.each_with_object({}) do |(key, child), memo|
          memo[yield(key)] = deep_transform(child, &block)
        end
      when Array
        value.map { |child| deep_transform(child, &block) }
      else
        value
      end
    end
  end
end
