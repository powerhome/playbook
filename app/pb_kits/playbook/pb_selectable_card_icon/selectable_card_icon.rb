# frozen_string_literal: true

module Playbook
  module PbSelectableCardIcon
    class SelectableCardIcon
      include Playbook::Props

      partial "pb_selectable_card_icon/selectable_card_icon"

      # Icon and text props
      prop :icon, type: Playbook::Props::String
      prop :title_text, type: Playbook::Props::String
      prop :body_text, type: Playbook::Props::String

      # Form props
      prop :input_id, type: Playbook::Props::String
      prop :name, type: Playbook::Props::String
      prop :multi, type: Playbook::Props::Boolean,
                   default: true
      prop :checked, type: Playbook::Props::Boolean,
                     default: false
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :card_icon, type: Playbook::Props::Boolean,
                       default: false
      prop :value

      prop :dark, type: Playbook::Props::Boolean,
                  default: false

      def classname
        generate_classname("pb_selectable_card_icon_kit", checked_class, dark_class, enabled_disabled_class)
      end

    private

      def checked_class
        checked ? "checked" : nil
      end

      def dark_class
        dark ? "dark" : nil
      end

      def enabled_disabled_class
        disabled ? "disabled" : "enabled"
      end
    end
  end
end
