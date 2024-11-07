# frozen_string_literal: true

module Playbook
  module PbTimeline
    class Step < Playbook::KitBase
      prop :icon, type: Playbook::Props::String
      prop :icon_color, type: Playbook::Props::Enum,
                        values: %w[default royal blue purple teal red yellow green],
                        default: "default"

      def classname
        generate_classname("pb_timeline_item_step")
      end
    end
  end
end
