# frozen_string_literal: true

module Playbook
  module PbCurrency
    class Currency < Playbook::KitBase
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

      prop :emphasized, type: Playbook::Props::Boolean,
                        default: true

      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default light bold],
                     default: "default"

      prop :dark, type: Playbook::Props::Boolean,
                  default: false

      prop :abbreviate, type: Playbook::Props::Boolean,
                        default: false

      prop :decimals, type: Playbook::Props::String,
                      required: false

      def classname
        generate_classname("pb_currency_kit", align, size, dark_class)
      end

      def currency_wrapper_props
        {
          classname: "dollar_sign",
          color: "light",
          dark: dark,
        }
      end

      def title_props
        {
          size: size_value,
          text: abbreviate ? abbreviated_value : whole_value,
          classname: "pb_currency_value",
          dark: dark,
        }
      end

      def body_props
        {
          text: units_element,
          color: "light",
          classname: "unit",
          dark: dark,
        }
      end

      def emphasized_class
        emphasized ? "" : "_deemphasized"
      end

      def variant_class
        return unless size == "sm"

        case variant
        when "light"
          "_light"
        when "bold"
          "_bold"
        end
      end

    private

      def whole_value
        return amount if decimals == "matching"

        amount.split(".").first.to_s
      end

      def abbreviated_value(index = 0..-2)
        value = amount.split(".").first.split(",").join("")
        abbreviated_num = number_to_human(value, units: { thousand: "K", million: "M", billion: "B", trillion: "T" }).gsub(/\s+/, "").to_s
        abbreviated_num[index]
      end

      def units_element
        return "" if decimals == "matching" && !abbreviate && !unit

        _, decimal_part = amount.split(".")
        if unit.nil? && abbreviate == false
          decimal_part.nil? ? ".00" : ".#{decimal_part}"
        else
          abbreviate ? "#{abbreviated_value(-1)}#{unit}" : unit
        end
      end

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
