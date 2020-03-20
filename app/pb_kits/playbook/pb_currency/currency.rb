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
                  values: %w[lg md sm],
                  default: "md"

      prop :label, type: Playbook::Props::String,
                   default: ""

      prop :symbol, type: Playbook::Props::String,
                    default: "$"

      prop :amount, type: Playbook::Props::String,
                    required: true

      prop :unit, type: Playbook::Props::String,
                  required: false

      prop :dark, type: Playbook::Props::Boolean,
                  default: false

      def classname
        generate_classname("pb_currency_kit", align, size, dark_class)
      end

      def currency_symbol_element
        pb_dollar_sign = Playbook::PbBody::Body.new(
          classname: "dollar_sign",
          color: "light",
          dark: dark
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
        whole_part = amount.split(".")
        pb_title = Playbook::PbTitle::Title.new(
          size: size_value,
          text: whole_part.first.to_s,
          classname: "pb_currency_value",
          dark: dark
        )

        ApplicationController.renderer.render(
          partial: pb_title,
          as: :object
        )
      end

      def units_element
        _, decimal_part = amount.split(".")
        if unit.nil?
          decimal_part.nil? ? ".00" : ".#{decimal_part}"
        else
          unit
        end
      end

    private

      def size_value
        case size
        when "lg"
          1
        when "md"
          3
        else
          4
        end
      end

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
