# frozen_string_literal: true

module Playbook
  module PbTooltip
    class Tooltip
      include Playbook::Props
      partial "pb_tooltip/tooltip"

      prop :position
      prop :trigger_element_id
      prop :tooltip_id
      prop :offset, type: Playbook::Props::Boolean, default: false
      prop :close_on_click, type: Playbook::Props::Enum,
                            values: %w[none outside inside any],
                            default: "none"

      def classname
        generate_classname("pb_tooltip_kit")
      end

      def data
        Hash(values[:data]).merge(
          pb_tooltip_kit: true,
          pb_tooltip_position: position,
          pb_tooltip_trigger_element_id: trigger_element_id,
          pb_tooltip_tooltip_id: tooltip_id,
          pb_tooltip_offset: offset,
          pb_tooltip_close_on_click: close_on_click
        )
      end
    end
  end
end
