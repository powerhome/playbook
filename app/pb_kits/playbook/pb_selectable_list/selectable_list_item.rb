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

      partial "pb_selectable_list/selectable_list_item"

      ##todo check this after done everything else
      def classname
        generate_classname("pb_item_kit")
      end

    end
  end
end
