# frozen_string_literal: true

module Playbook
  module PbSelectableList
    class SelectableListItem
      include Playbook::Props

      prop :tabindex

      prop :checked, type: Playbook::Props::Boolean,
                     default: false
      prop :name, type: Playbook::Props::String,
                  default: "radio_name"
      prop :text, type: Playbook::Props::String
      prop :value, type: Playbook::Props::String,
                   default: "radio_text"

      prop :variant, type: Playbook::Props::Enum,
                     values: %w[radio checkbox],
                     default: "radio"

      partial "pb_selectable_list/selectable_list_item"

      def classname
        generate_classname("pb_selectable_list_item_kit")
      end
    end
  end
end
