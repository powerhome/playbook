# frozen_string_literal: true

module Playbook
  module PbTimeline
    class Label < Playbook::KitBase
      prop :date

      def classname
        generate_classname("pb_timeline_item_left_block")
      end
    end
  end
end
