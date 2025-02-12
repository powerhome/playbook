# frozen_string_literal: true

module Playbook
  module PbIconButton
    class IconButton < ::Playbook::KitBase
      prop :type, type: Playbook::Props::Enum,
                  values: %w[button submit reset],
                  default: "button"
      prop :icon, required: false, default: "bars"
      prop :link
      prop :new_window, type: Playbook::Props::Boolean,
                        default: false
      prop :target
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default link],
                     default: "default"
      prop :size, type: Playbook::Props::Enum,
                  values: %w[1x 2x 3x 4x 5x 6x 7x 8x 9x 10x xs sm lg],
                  default: "2x"
      def classname
        generate_classname("pb_icon_button_kit", variant)
      end
    end
  end
end
