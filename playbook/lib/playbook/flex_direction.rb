# frozen_string_literal: true

module Playbook
  module FlexDirection
    def self.included(base)
      base.prop :flex_direction
    end

    FLEX_DIRECTION_VALUES = %w[row column rowReverse columnReverse].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def flex_direction_props
      value = flex_direction
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "flex_direction_#{value[:default].underscore} " if value.key?(:default) && FLEX_DIRECTION_VALUES.include?(value[:default])
        value.each do |media_size, flex_value|
          css << "flex_direction_#{media_size}_#{flex_value.underscore} " if SCREEN_SIZES.include?(media_size.to_s) && FLEX_DIRECTION_VALUES.include?(flex_value)
        end
        css.strip unless css.empty?
      else
        "flex_direction_#{value.underscore}" if FLEX_DIRECTION_VALUES.include?(value)
      end
    end

    def flex_direction_options
      { flex_direction: "flex_direction" }
    end

    def flex_direction_values
      FLEX_DIRECTION_VALUES
    end
  end
end
