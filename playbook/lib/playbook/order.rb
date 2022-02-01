# frozen_string_literal: true

module Playbook
  module Order
    def self.included(base)
      base.prop :order
    end

    def order_props
      selected_props = order_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        order_value = send(k)
        "order_#{order_value}" if order_values.include? order_value
      end.compact.join(" ")
    end

    def order_options
      {
        order: "order",
      }
    end

    def order_values
      %w[1 2 3 4 5 6 7 8 9 10 11 12 none]
    end
  end
end
