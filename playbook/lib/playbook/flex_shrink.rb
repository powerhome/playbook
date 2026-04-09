# frozen_string_literal: true

module Playbook
  module FlexShrink
    def self.included(base)
      base.prop :flex_shrink
    end

    FLEX_SHRINK_VALUES = %w[1 0].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def flex_shrink_props
      value = flex_shrink
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "flex_shrink_#{value[:default]} " if value.key?(:default) && FLEX_SHRINK_VALUES.include?(value[:default].to_s)
        value.each do |media_size, shrink_value|
          css << "flex_shrink_#{media_size}_#{shrink_value} " if SCREEN_SIZES.include?(media_size.to_s) && FLEX_SHRINK_VALUES.include?(shrink_value.to_s)
        end
        css.strip unless css.empty?
      elsif FLEX_SHRINK_VALUES.include?(value.to_s)
        "flex_shrink_#{value}"
      end
    end

    def flex_shrink_options
      { flex_shrink: "flex_shrink" }
    end

    def flex_shrink_values
      FLEX_SHRINK_VALUES
    end
  end
end
