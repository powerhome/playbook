# frozen_string_literal: true

module Playbook
  module PbCheckboxCard
    class CheckboxCard
      include Playbook::Props

      partial "pb_checkbox_card/checkbox_card"

      prop :checked, type: Playbook::Props::Boolean,
                  default: false
      prop :disabled, type: Playbook::Props::Boolean,
                  default: false
      prop :icon, type: Playbook::Props::Boolean,
                  default: false

      prop :input_id, type: Playbook::Props::String
      prop :name
      prop :text
      prop :value

      def classname
        generate_classname("pb_checkbox_card_kit", checked_class)
      end

      def checked_class
        checked ? "checked" : nil
      end
    end
  end
end
