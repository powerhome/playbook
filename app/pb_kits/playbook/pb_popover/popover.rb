# frozen_string_literal: true

module Playbook
  module PbPopover
    class Popover
      include Playbook::Props
      partial "pb_popover/popover"

      prop :position
      prop :trigger_element_id
      prop :tooltip_id
      prop :offset, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_popover_kit")
      end
    end
  end
end
