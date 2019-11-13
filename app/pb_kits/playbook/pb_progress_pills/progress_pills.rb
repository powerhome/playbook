# frozen_string_literal: true

module Playbook
  module PbProgressPills
    class ProgressPills
      include Playbook::Props

      partial "pb_progress_pills/progress_pills"

      prop :active, default: 0
      prop :text
      prop :dark, type: Playbook::Props::Boolean,
                 default: false
      prop :steps, default: 3
      prop :status
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[success warning error info neutral],
                     default: "neutral"

      def classname
        generate_classname("pb_progress_pills_kit",dark_class)
      end

      def dark_class
        dark ? "dark" : nil
      end

    end
  end
end
