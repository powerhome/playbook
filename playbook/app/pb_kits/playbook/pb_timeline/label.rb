# frozen_string_literal: true

module Playbook
  module PbTimeline
    class Label < Playbook::KitBase
      prop :date
      prop :show_current_year, type: Playbook::Props::Boolean,
                               default: false

      def classname
        generate_classname("pb_timeline_item_left_block")
      end
    end
  end
end
