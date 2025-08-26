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
        input_id = id.present? ? "#{id}-input" : "pb_toggle_#{SecureRandom.hex(4)}"
        check_box_tag(name, value, checked, input_options.merge(disabled: disabled, id: input_id))
      end

    private

      def checked_class
        checked ? "on" : "off"
      end
    end
  end
end
