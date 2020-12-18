# frozen_string_literal: true

module Playbook
  module PbLabelPill
    class LabelPill < Playbook::KitBase
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[success warning error info neutral primary],
                     default: "neutral"
      prop :label
      prop :pill_value

      def classname
        generate_classname("pb_label_pill_kit")
      end
    end
  end
end
