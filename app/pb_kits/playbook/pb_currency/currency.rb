# frozen_string_literal: true

module Playbook
  module PbCurrency
    class Currency
      include Playbook::Props
      include ActionView::Helpers::NumberHelper
     
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :label, type: Playbook::PbCaption::Caption.new(text: label)
      prop :amount, required: true
      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg sm],
                  default: "sm"

      def classname
        generate_classname("pb_currency_kit")
      end

      # def align
      #   align_options = %w[left center right]
      #   one_of_value(configured_align, align_options, "left")
      # end

      # def label
      #   if is_set? configured_label
      #     pb_label = Playbook::PbCaption::Caption.new(text: configured_label)
      #     ApplicationController.renderer.render(partial: pb_label, as: :object)
      #   end
      # end

      # def size
      #   size_options = %w[lg sm]
      #   one_of_value(configured_size, size_options, "sm")
      # end

      # def value_size
      #   size == "lg" ? 1 : 2
      # end

      def amount
        if is_set? configured_amount
          display_amount = formatted_amount[1...-2]
          display_amount
        end
      end

      def to_partial_path
        "pb_currency/currency"
      end

    private

      def formatted_amount
        number_to_currency(configured_amount)
      end

      def unit
        pb_unit = Playbook::PbBody::Body.new(classname: "unit", color: "light") do
          formatted_amount.last(2)
        end
        ApplicationController.renderer.render(partial: pb_unit, as: :object)
      end

      def currency_indicator
        pb_currency_indicator = Playbook::PbBody::Body.new(classname: "currency_indicator", color: "light") do
          formatted_amount.first(1)
        end
        ApplicationController.renderer.render(partial: pb_currency_indicator, as: :object)
      end
    end
  end
end
