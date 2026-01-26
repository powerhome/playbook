# frozen_string_literal: true

module Playbook
  module Order
    def self.included(base)
      base.prop :order
    end

    # rubocop:disable Style/IfInsideElse
    def order_props
      selected_props = order_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        order_value = send(k)
        if order_value.is_a?(Hash)
          order_value.map do |media_size, order_size_value|
            "flex_order_#{media_size}_#{order_size_value}" if order_values.include? order_size_value.to_s
          end
        else
          "flex_order_#{order_value}" if order_values.include? order_value.to_s
        end
      end.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

    def order_options
      {
        order: "order",
      }
    end

    def order_values
      %w[1 2 3 4 5 6 7 8 9 10 11 12]
    end
  end
end
