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
                  default: false
      prop :multi, type: Playbook::Props::Boolean,
                  default: true
      prop :input_id, type: Playbook::Props::String
      prop :name
      prop :text
      prop :value

      
      

      def classname
        generate_classname("pb_selectable_card_kit", checked_class, dark_class, enable_disabled_class)
      end

      def input_id_present
        input_id.present? ? input_id : name
      end

    private
      
      def checked_class
        checked ? "checked" : nil 
      end

      def dark_class
        dark ? "dark" : nil
      end

      def enable_disabled_class
        disabled ? "disabled" : "enabled"
      end
    end
  end
end