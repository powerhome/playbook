# frozen_string_literal: true

module Playbook
  module PbPopover
    class Popover
      include Playbook::Props
      partial "pb_popover/popover"

      prop :position
      prop :buttonId
      prop :tooltipId
      prop :offset, type: Playbook::Props::Boolean, default: false

      def popover_offset
        offset ? [0, 8] : [0, 0]
      end

      def classname
        generate_classname("pb_popover_kit")
      end
    end
  end
end
