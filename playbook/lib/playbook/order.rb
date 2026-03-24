# frozen_string_literal: true

module Playbook
  module Order
    def self.included(base)
      base.prop :order
    end

    ORDER_VALUES = %w[1 2 3 4 5 6 7 8 9 10 11 12].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def order_props
      value = order
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "flex_order_#{value[:default]} " if value.key?(:default) && ORDER_VALUES.include?(value[:default].to_s)
        value.each do |media_size, order_size_value|
          css << "flex_order_#{media_size}_#{order_size_value} " if SCREEN_SIZES.include?(media_size.to_s) && ORDER_VALUES.include?(order_size_value.to_s)
        end
        css.strip unless css.empty?
      else
        "flex_order_#{value}" if ORDER_VALUES.include?(value.to_s)
      end
    end

    def order_options
      { order: "order" }
    end

    def order_values
      ORDER_VALUES
    end
  end
end
