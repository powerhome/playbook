# frozen_string_literal: true

module Playbook
  module FlexWrap
    def self.included(base)
      base.prop :flex_wrap
    end

    FLEX_WRAP_VALUES = %w[wrap nowrap wrapReverse].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def flex_wrap_props
      value = flex_wrap
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "flex_wrap_#{value[:default].underscore} " if value.key?(:default) && FLEX_WRAP_VALUES.include?(value[:default])
        value.each do |media_size, wrap_value|
          css << "flex_wrap_#{media_size}_#{wrap_value.underscore} " if SCREEN_SIZES.include?(media_size.to_s) && FLEX_WRAP_VALUES.include?(wrap_value)
        end
        css.strip unless css.empty?
      elsif FLEX_WRAP_VALUES.include?(value)
        "flex_wrap_#{value}"
      end
    end

    def flex_wrap_options
      { flex_wrap: "flex_wrap" }
    end

    def flex_wrap_values
      FLEX_WRAP_VALUES
    end
  end
end
