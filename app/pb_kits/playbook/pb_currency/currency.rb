# frozen_string_literal: true

module Playbook
  module PbCurrency
    class Currency
      include ActionView::Context
      include Playbook::Props

      partial "pb_currency/currency"

      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"

      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg sm],
                  default: "sm"

      prop :label, type: Playbook::Props::String,
                   default: ""

      prop :separator, type: Playbook::Props::String,
                       default: "."

      prop :symbol, type: Playbook::Props::String,
                    default: "$"

      prop :amount, type: Playbook::Props::String,
                    required: true

      def classname
        generate_classname("pb_currency_kit", align)
      end

      def currency_symbol_element
        pb_dollar_sign = Playbook::PbBody::Body.new(
          classname: "dollar_sign",
          color: "light"
        ) { symbol }

        ApplicationController.renderer.render(
          partial: pb_dollar_sign,
          as: :object
        )
      end

      def label_element
        pb_label = Playbook::PbCaption::Caption.new(text: label)

        ApplicationController.renderer.render(
          partial: pb_label,
          as: :object
        )
      end

      def amount_element
        whole_part, _ = amount.split(separator)

        pb_title = Playbook::PbTitle::Title.new(
          size: size_value,
          text: "#{whole_part}#{separator}",
          classname: "pb_currency_value"
        )

        ApplicationController.renderer.render(
          partial: pb_title,
          as: :object
        )
      end

      def units_element
        _, decimal_part = amount.split(separator)

        pb_unit = Playbook::PbBody::Body.new(
          classname: "unit",
          color: "light"
        ) { decimal_part || "00" }

        ApplicationController.renderer.render(
          partial: pb_unit,
          as: :object
        )
      end

    private

      def size_value
        size == "lg" ? 1 : 2
      end
    end
  end
end
