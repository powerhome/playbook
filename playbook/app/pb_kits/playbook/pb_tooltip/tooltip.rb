# frozen_string_literal: true

module Playbook
  module PbTooltip
    class Tooltip < Playbook::KitBase
      prop :position
      prop :trigger_element_selector
      prop :trigger_element_id, deprecated: true
      prop :tooltip_id
      prop :interaction, type: Playbook::Props::Boolean,
                         default: false
      prop :icon
      prop :delay_open
      prop :delay_close
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :trigger_method, type: Playbook::Props::Enum,
                            values: %w[hover click],
                            default: "hover"

      def classname
        generate_classname("pb_tooltip_kit", dark_class)
      end

      def data
        data = Hash(values[:data]).merge(
          pb_tooltip_kit: true,
          pb_tooltip_position: position,
          pb_tooltip_trigger_element_selector: trigger_element_selector,
          pb_tooltip_trigger_element_id: trigger_element_id,
          pb_tooltip_tooltip_id: tooltip_id,
          pb_tooltip_show_tooltip: true,
          pb_tooltip_trigger_method: trigger_method,
          pb_tooltip_interaction: interaction
        )
        data = data.merge(pb_tooltip_delay_open: delay_open) if delay_open
        data = data.merge(pb_tooltip_delay_close: delay_close) if delay_close
        data
      end

    private

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
