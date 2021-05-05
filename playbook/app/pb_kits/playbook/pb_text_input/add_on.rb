# frozen_string_literal: true

module Playbook
  module PbTextInput
    class AddOn < Playbook::KitBase
      prop :icon, type: Playbook::Props::String, required: true
      prop :alignment, type: Playbook::Props::Enum, values: %w[right left], default: "right"
      prop :border, type: Playbook::Props::Boolean, default: true

      def border_css
        border_toggle = border ? "on" : "off"
        border_to_change = if alignment == "left"
                             "right"
                           else
                             "left"
                           end

        "border_#{border_to_change}_#{border_toggle}"
      end

      def left_aligned?
        alignment == "left"
      end

      def dark_mode_css
        dark ? "add-on-card-dark" : nil
      end
    end
  end
end
