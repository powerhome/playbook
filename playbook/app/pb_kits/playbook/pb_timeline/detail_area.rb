# frozen_string_literal: true

module Playbook
  module PbTimeline
    class DetailArea < Playbook::KitBase
      def classname
        generate_classname("pb_timeline_item_right_block")
      end
    end
  end
end
