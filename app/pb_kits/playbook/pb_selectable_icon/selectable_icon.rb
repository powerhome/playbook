# frozen_string_literal: true

module Playbook
  module PbSelectableIcon
    class SelectableIcon
      include Playbook::Props

      partial "pb_selectable_icon/selectable_icon"

      # Icon props
      prop :icon, type: Playbook::Props::String
      # Title text
      prop :text, type: Playbook::Props::String

      # Form Props
      prop :input_id, type: Playbook::Props::String
      prop :name, type: Playbook::Props::String
      prop :multi, type: Playbook::Props::Boolean,
                   default: true
      prop :checked, type: Playbook::Props::Boolean,
                     default: false
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :value

      prop :input_options, type: Playbook::Props::Hash,
                           default: {}

      # Conditional rendering for input field
      prop :inputs, type: Playbook::Props::String,
                    default: "enabled"

      def classname
        generate_classname("pb_selectable_icon_kit", checked_class, enabled_disabled_class)
      end

      def input_id_present
        input_id.present? ? input_id : name
      end

      def additional_input_options
        input_options.merge(
          id: input_id_present,
          disabled: disabled
        )
      end

    private

      def checked_class
        checked ? "checked" : nil
      end

      def enabled_disabled_class
        disabled ? "disabled" : "enabled"
      end
    end
  end
end
