# frozen_string_literal: true

module Playbook
  module PbCircleIconButton
    class CircleIconButton < Playbook::KitBase
      prop :type, type: Playbook::Props::Enum,
                  values: %w[button submit reset],
                  default: "button"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[primary secondary link],
                     default: "primary"
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :icon, required: true
      prop :loading, type: Playbook::Props::Boolean,
                     default: false
      prop :link
      prop :new_window, type: Playbook::Props::Boolean,
                        default: false
      prop :target
      def classname
        generate_classname("pb_circle_icon_button_kit")
      end
    end
  end
end
