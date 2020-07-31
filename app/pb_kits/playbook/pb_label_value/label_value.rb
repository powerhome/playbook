# frozen_string_literal: true

module Playbook
  module PbLabelValue
    class LabelValue
      include Playbook::Props

      partial "pb_label_value/label_value"

      prop :label, required: true
      prop :value
      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default details],
                     default: "default"
      prop :icon
      prop :description
      prop :title
      prop :date
      prop :active, type: Playbook::Props::Boolean, default: false


      def classname
        generate_classname("pb_label_value_kit", variant_class, dark_class)
      end

      def date_element
        "&middot; #{date.strftime('%m/%d')}".html_safe
      end

    private

      def dark_class
        dark ? "dark" : nil
      end

      def variant_class
        variant == "details" ? "details" : nil
      end
    end
  end
end
