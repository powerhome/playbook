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

      def data
        Hash(values[:data]).merge(
          pb_popover_kit: true,
          pb_popover_position: position,
          pb_popover_trigger_element_id: trigger_element_id,
          pb_popover_tooltip_id: tooltip_id,
          pb_popover_offset: offset,
        )
      end
    end
  end
end
