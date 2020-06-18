# frozen_string_literal: true

module Playbook
  module PbPopover
    class Popover
      include Playbook::Props
      partial "pb_popover/popover"

      prop :position, type: Playbook::Props::Enum,
                      values: %w[top bottom left right],
                      default: "left"
      prop :trigger_element_id
      prop :tooltip_id
      prop :max_height
      prop :max_width
      prop :min_width
      prop :min_height
      prop :z_index, type: Playbook::Props::String
      prop :offset, type: Playbook::Props::Boolean, default: false
      prop :close_on_click, type: Playbook::Props::Enum,
                            values: %w[none outside inside any],
                            default: "none"

      def classname
        generate_classname_without_spacing("pb_popover_kit")
      end

      def popover_spacing_helper
        generate_classname(spacing_props.nil? ? "p_sm" : spacing_props)
      end

      def z_index_helper
        z_index.present? ? "z-index: #{z_index}" : ""
      end

      def width_height_helper
        out = ""
        out += "max-height: #{max_height}; " if max_height.present?
        out += "max-width: #{max_width}; " if max_width.present?
        out += "min-height: #{min_height}; " if min_height.present?
        out += "min-width: #{min_width};" if min_width.present?
        out
      end

      def data
        Hash(values[:data]).merge(
          pb_popover_kit: true,
          pb_popover_position: position,
          pb_popover_trigger_element_id: trigger_element_id,
          pb_popover_tooltip_id: tooltip_id,
          pb_popover_offset: offset,
          pb_popover_close_on_click: close_on_click
        )
      end
    end
  end
end
