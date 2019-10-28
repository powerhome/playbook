# frozen_string_literal: true

module Playbook
  module PbLabelPill
    class LabelPill
      include Playbook::Props

      partial "pb_label_pill/label_pill"

      prop :variant, default: "neutral"
      prop :label
      prop :pill_value

      def classname
        generate_classname("pb_label_pill_label")
      end
    end
  end
end
