# frozen_string_literal: true

module Playbook
  module PbSelectableCard
    class SelectableCard
      include Playbook::Props

      partial "pb_selectable_card/selectable_card"

      prop :checked, type: Playbook::Props::Boolean,
                     default: false
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :icon, type: Playbook::Props::Boolean,
                  default: false
      prop :multi, type: Playbook::Props::Boolean,
                   default: true
      prop :input_id, type: Playbook::Props::String

      prop :additional_input_options, type: Playbook::Props::Hash,
                                      default: {}
      prop :name
      prop :text
      prop :value

      def classname
        generate_classname("pb_selectable_card_kit", checked_class, enable_disabled_class)
      end

      def input_id_present
        input_id.present? ? input_id : name
      end

      def input_options
        additional_input_options.merge(
          id: input_id_present,
          disabled: disabled
        )
      end

    private

      def checked_class
        checked ? "on" : "off"
      end

      def enable_disabled_class
        disabled ? "disabled" : "enabled"
      end
    end
  end
end
