# frozen_string_literal: true

module Playbook
  module PbSelectableCard
    class SelectableCard
      include Playbook::Props

      partial "pb_selectable_card/selectable_card"

      prop :checked, type: Playbook::Props::Boolean,
                  default: false
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :disabled, type: Playbook::Props::Boolean,
                  default: false
      prop :icon, type: Playbook::Props::Boolean,
                  default: true
      prop :multi, type: Playbook::Props::Boolean,
                  default: true
      prop :name
      prop :text
      prop :value

      def classname
        generate_classname("pb_selectable_card_kit", dark_class, disabled_class)
      end

      def html_for
        id.present? ? id : name
      end

    private

      def dark_class
        dark ? "dark" : nil
      end

      def disabled_class
        disabled ? "disabled" : "enabled"
      end
    end
  end
end
