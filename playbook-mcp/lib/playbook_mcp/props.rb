# frozen_string_literal: true

module PlaybookMcp
  module Props
  module_function

    # AI schemas use camelCase; Playbook Ruby kits expect snake_case symbols.
    # Opaque blobs (Highcharts `options`) keep their original key casing — only
    # the kit-level prop name is snake_cased (`options` → :options).
    PRESERVE_KEY_CASE = %w[options].freeze

    def to_kit_props(raw)
      case raw
      when Hash
        raw.each_with_object({}) do |(key, child), memo|
          key_s = key.to_s
          new_key = key_s.underscore.to_sym
          memo[new_key] = if PRESERVE_KEY_CASE.include?(key_s) || PRESERVE_KEY_CASE.include?(new_key.to_s)
                            deep_stringify_keys(child)
                          else
                            deep_transform(child) { |k| k.to_s.underscore.to_sym }
                          end
        end
      when Array
        raw.map { |child| to_kit_props(child) }
      else
        raw
      end
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
