# frozen_string_literal: true

module Playbook
  module PbTooltip
    class Tooltip < Playbook::KitBase
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :delay_open
      prop :delay_close
      prop :height
      prop :interaction, type: Playbook::Props::Boolean,
                         default: false
      prop :max_height
      prop :max_width
      prop :min_height
      prop :min_width
      prop :position
      prop :tooltip_id
      prop :trigger_element_selector
      prop :trigger_element_id, deprecated: true
      prop :trigger_method, type: Playbook::Props::Enum,
                            values: %w[hover click],
                            default: "hover"
      prop :use_click_to_open, type: Playbook::Props::Boolean,
                               default: false
      prop :width

      def classname
        generate_classname("pb_tooltip_kit")
      end

      def remove_height_properties(combined_html_options_style)
        return nil if combined_html_options_style.nil?

        combined_html_options_style.gsub(/\s*(height|min-height|max-height)\s*:[^;]*;?\s*/, "")
                                   .strip
                                   .presence
      end

      def height_and_width_helper
        out = ""
        out += "width: #{width};" if width.present?
        out += "height: #{height};" if height.present?
        out += "max-height: #{max_height};" if max_height.present?
        out += "max-width: #{max_width};" if max_width.present?
        out += "min-height: #{min_height};" if min_height.present?
        out += "min-width: #{min_width};" if min_width.present?
        out
      end

      def effective_trigger_method
        use_click_to_open ? "click" : (trigger_method || "hover")
      end

      def data
        data = Hash(values[:data]).merge(
          pb_tooltip_kit: true,
          pb_tooltip_position: position,
          pb_tooltip_trigger_element_selector: trigger_element_selector,
          pb_tooltip_trigger_element_id: trigger_element_id,
          pb_tooltip_tooltip_id: tooltip_id,
          pb_tooltip_show_tooltip: true,
          pb_tooltip_trigger_method: effective_trigger_method,
          pb_tooltip_interaction: interaction,
          pb_tooltip_use_click_to_open: use_click_to_open
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
