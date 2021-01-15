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

      prop :input_options, type: Playbook::Props::Hash,
                           default: {}
      prop :name
      prop :text
      prop :value
      prop :variant, type: Playbook::Props::String,
                     default: "default"

      def classname
        [
          generate_classname_without_spacing("pb_selectable_card_kit", checked_class, enable_disabled_class),
          dark_props,
        ].compact.join(" ")
      end

      def spacing_classname
        generate_classname
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

      def input
        multi ? "checkbox" : "radio"
      end

      def label_class
        variant == "display_input" ? "p_none" : spacing_classname
      end

      def is_checked
        checked ? "checked" : ""
      end

      def is_disabled
        disabled ? "disabled" : ""
      end

    private

      def checked_class
        checked ? "checked" : nil
      end

      def enable_disabled_class
        disabled ? "disabled" : "enabled"
      end
    end
  end
end
