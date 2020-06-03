# frozen_string_literal: true

module Playbook
  module PbTimeline
    class Timeline
      include Playbook::Props

      partial "pb_timeline/timeline"

      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "horizontal"
      prop :dark, type: Playbook::Props::Boolean,
                  default: false

      def classname
        generate_classname("pb_progress_step_kit", orientation, dark_class)
      end

    private

      def dark_class
        dark === true ? "dark" : nil
      end
    end
  end
end
