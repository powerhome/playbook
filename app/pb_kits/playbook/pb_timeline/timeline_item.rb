# frozen_string_literal: true

module Playbook
  module PbTimeline
    class Timeline
      include Playbook::Props

      partial "pb_timeline/timeline"

      prop :status, type: Playbook::Props::Enum,
                    values: %w[complete active inactive],
                    default: "inactive"
      prop :icon, required: true
      prop :icon_color, type: Playbook::Props::Enum,
                        values: %w[default royal blue purple teal red yellow green],
                        default: "default"

      def classname
        generate_classname("pb_progress_step_kit", orientation, dark_class)
      end
  end
end
