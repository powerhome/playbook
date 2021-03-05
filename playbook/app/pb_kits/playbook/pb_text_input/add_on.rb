# frozen_string_literal: true

module Playbook
  module PbTextInput
    class AddOn < Playbook::KitBase
      prop :icon, type: Playbook::Props::String, required: true
      prop :alignment, type: Playbook::Props::Enum, values: %w[right left], default: "right"
      prop :border, type: Playbook::Props::Boolean, default: true

      def border_css
        border_toggle = border ? 'on' : 'off'
        if alignment == 'left'
          border_to_change = 'right'
        else
          border_to_change = 'left'
        end

        "border_#{border_to_change}_#{border_toggle}"
      end

      def dark_mode_css
        dark ? 'add-on-card-dark' : nil
      end
    end
  end
end
