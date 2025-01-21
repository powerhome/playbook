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
      def classname
        generate_classname("pb_icon_button_kit", variant)
      end
    end
  end
end
