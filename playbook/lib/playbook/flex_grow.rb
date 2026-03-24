# frozen_string_literal: true

module Playbook
  module FlexGrow
    def self.included(base)
      base.prop :flex_grow
    end

    FLEX_GROW_VALUES = %w[1 0].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def flex_grow_props
      value = flex_grow
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "flex_grow_#{value[:default]} " if value.key?(:default) && FLEX_GROW_VALUES.include?(value[:default].to_s)
        value.each do |media_size, grow_value|
          css << "flex_grow_#{media_size}_#{grow_value} " if SCREEN_SIZES.include?(media_size.to_s) && FLEX_GROW_VALUES.include?(grow_value.to_s)
        end
        css.strip unless css.empty?
      elsif FLEX_GROW_VALUES.include?(value.to_s)
        "flex_grow_#{value}"
      end
    end

    def flex_grow_options
      { flex_grow: "flex_grow" }
    end

    def flex_grow_values
      FLEX_GROW_VALUES
    end
  end
end
