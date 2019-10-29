# frozen_string_literal: true

module Playbook
  module PbLabelValue
    class LabelValue
      include Playbook::Props

      partial "pb_label_value/label_value"

      prop :label, required: true
      prop :value, required: true

      def classname
        generate_classname("pb_label_value_kit")
      end
    end
  end
end
