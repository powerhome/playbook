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

      prop :decimals, type: Playbook::Props::Enum,
                      values: %w[default matching],
                      default: "default"

      prop :unstyled, type: Playbook::Props::Boolean,
                      default: false

      prop :comma_separator, type: Playbook::Props::Boolean,
                             default: false

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

      def caption_props
        {
          text: label,
          dark: dark,
        }
      end

      def title_props
        {
          size: size_value,
          text: absolute_amount(abbreviate ? abbreviated_value : formatted_amount),
          classname: "pb_currency_value",
          dark: dark,
        }
      end

      def negative_sign
        amount.starts_with?("-") ? "-" : ""
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
        case variant
        when "light"
          "_light"
        when "bold"
          "_bold"
        end
      end

    private

      def whole_value
        value = amount.split(".").first
        if comma_separator
          number_with_delimiter(value.gsub(",", ""))
        else
          value
        end
      end

      def decimal_value
        amount.split(".")[1] || "00"
      end

      def units_element
        return "" if decimals == "matching" && !abbreviate && !unit

        if unit.nil? && !abbreviate
          if decimals == "matching"
            ""
          else
            ".#{decimal_value}"
          end
        else
          abbreviate ? "#{abbreviated_value(-1)}#{unit}" : unit
        end
      end

      def abbreviated_value(index = 0..-2)
        value = amount.split(".").first.gsub(",", "").to_i
        abbreviated_num = number_to_human(value, units: { thousand: "K", million: "M", billion: "B", trillion: "T" }).gsub(/\s+/, "")
        abbreviated_num[index]
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

      def formatted_amount
        return abbreviated_value if abbreviate

        if decimals == "matching"
          if comma_separator
            number_with_delimiter(amount.gsub(",", ""))
          else
            amount
          end
        else
          whole_value
        end
      end

      def absolute_amount(amount_string)
        amount_string.sub(/^-/, "")
      end
    end
  end
end
