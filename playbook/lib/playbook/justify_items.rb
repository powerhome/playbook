# frozen_string_literal: true

module Playbook
  module JustifyItems
    def self.included(base)
      base.prop :justify_items
    end

    JUSTIFY_ITEMS_VALUES = %w[start end center stretch].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def justify_items_props
      value = justify_items
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "justify_items_#{value[:default].underscore} " if value.key?(:default) && JUSTIFY_ITEMS_VALUES.include?(value[:default])
        value.each do |media_size, justify_value|
          css << "justify_items_#{media_size}_#{justify_value.underscore} " if SCREEN_SIZES.include?(media_size.to_s) && JUSTIFY_ITEMS_VALUES.include?(justify_value)
        end
        css.strip unless css.empty?
      elsif JUSTIFY_ITEMS_VALUES.include?(value)
        "justify_items_#{value.underscore}"
      end
    end

    def justify_items_options
      { justify_items: "justify_items" }
    end

    def justify_items_values
      JUSTIFY_ITEMS_VALUES
    end
  end
end
