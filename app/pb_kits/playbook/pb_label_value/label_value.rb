# frozen_string_literal: true

module Playbook
  module PbLabelValue
    class LabelValue
      include Playbook::Props

      partial "pb_label_value/label_value"

      prop :label, required: true
      prop :value, required: true
      prop :dark, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_label_value_kit", dark_class)
      end

    private

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
