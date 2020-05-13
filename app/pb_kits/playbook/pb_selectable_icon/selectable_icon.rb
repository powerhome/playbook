# frozen_string_literal: true

module Playbook
  module PbSelectableIcon
    class SelectableIcon
      include Playbook::Props

      partial "pb_selectable_icon/selectable_icon"

      # Icon props
      prop :icon, type: Playbook::Props::String,
                  default: "user"
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      # Title text
      prop :text, type: Playbook::Props::String

      # Form Props
      prop :input_id, type: Playbook::Props::String
      prop :name
      prop :multi, type: Playbook::Props::Boolean,
                   default: true
      prop :checked, type: Playbook::Props::Boolean,
                     default: false
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :value

      def classname
        generate_classname("pb_selectable_icon_kit", dark_class)
      end

    private

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
