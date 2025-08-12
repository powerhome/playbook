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
      prop :size, type: Playbook::Props::Enum,
                  values: %w[default sm],
                  default: "default"
      prop :input_options, type: Playbook::Props::HashProp,
                           default: {}

      def classname
        generate_classname("pb_circle_icon_button_kit") + size_class
      end

      def size_class
        size == "sm" ? " size_small" : ""
      end
    end
  end
end
