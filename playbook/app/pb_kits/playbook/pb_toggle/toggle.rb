# frozen_string_literal: true

require "action_view"

module Playbook
  module PbToggle
    class Toggle < Playbook::KitBase
      prop :input_options, type: Playbook::Props::HashProp,
                           default: {}

      prop :checked, type: Playbook::Props::Boolean,
                     default: false
      prop :name
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md],
                  default: "sm"
      prop :value
      prop :disabled, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_toggle_kit", size, checked_class)
      end

      def input
        check_box_tag(name, value, checked, input_options.merge(disabled: disabled))
      end

    private

      def checked_class
        checked ? "on" : "off"
      end
    end
  end
end
