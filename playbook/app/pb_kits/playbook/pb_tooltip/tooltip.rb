# frozen_string_literal: true

module Playbook
  module PbTooltip
    class Tooltip < Playbook::KitBase
      prop :position
      prop :trigger_element_selector
      prop :trigger_element_id, deprecated: true
      prop :tooltip_id
      prop :dark, type: Playbook::Props::Boolean,
                  default: false

      def classname
        generate_classname("pb_tooltip_kit", dark_class)
      end

      def data
        Hash(values[:data]).merge(
          pb_tooltip_kit: true,
          pb_tooltip_position: position,
          pb_tooltip_trigger_element_selector: trigger_element_selector,
          pb_tooltip_trigger_element_id: trigger_element_id,
          pb_tooltip_tooltip_id: tooltip_id
        )
      end

    private

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
