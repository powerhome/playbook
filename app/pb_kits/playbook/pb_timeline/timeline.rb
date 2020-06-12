# frozen_string_literal: true

module Playbook
  module PbTimeline
    class Timeline
      include Playbook::Props

      partial "pb_timeline/timeline"

      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "horizontal"
      prop :show_date, type: Playbook::Props::Boolean,
                       default: false

      def classname
        generate_classname("pb_timeline_kit", orientation, date_class)
      end

    private

      def date_class
        show_date ? "with_date" : nil
      end
    end
  end
end
