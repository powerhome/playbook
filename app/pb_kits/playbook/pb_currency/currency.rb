# frozen_string_literal: true

require "action_view"

module Playbook
  module PbCurrency
    class Currency
      include Playbook::Props
      include ActionView::Helpers::NumberHelper

      partial "pb_currency/currency"

      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :amount, required: true
      prop :label
      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg sm],
                  default: "sm"
      prop :unit, default: "$"

      def classname
        generate_classname("pb_currency_kit", align)
      end

      def title_size
        size == "lg" ? 1 : 2
      end

      def display_amount
        formatted_amount[1...-2]
      end

      def cents
        formatted_amount.last(2)
      end

    private

      def formatted_amount
        number_to_currency(amount)
      end
    end
  end
end
