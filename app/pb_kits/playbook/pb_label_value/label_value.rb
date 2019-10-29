# frozen_string_literal: true

module Playbook
  module PbLabelValue
    class LabelValue
      include Playbook::Props

      partial "pb_label_value/label_value"

      prop :label, type: Playbook::Props::String
      prop :value, type: Playbook::Props::String,
                   default: ""

      def classname
        generate_classname("pb_label_value_kit")
      end
    end
  end
end
