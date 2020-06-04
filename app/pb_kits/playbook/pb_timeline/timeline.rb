# frozen_string_literal: true

module Playbook
  module PbTimeline
    class Timeline
      include Playbook::Props

      partial "pb_timeline/timeline"

      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "horizontal"

      def classname
        generate_classname("pb_timeline_kit", orientation)
      end
    end
  end
end
