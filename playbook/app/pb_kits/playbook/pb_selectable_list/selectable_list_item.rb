# frozen_string_literal: true

module Playbook
  module PbSelectableList
    class SelectableListItem < Playbook::KitBase
      prop :tabindex
      prop :checked, type: Playbook::Props::Boolean,
                     default: false
      prop :drag_handle, type: Playbook::Props::Boolean,
                         default: true
      prop :drag_id, type: Playbook::Props::String
      prop :name, type: Playbook::Props::String
      prop :text, type: Playbook::Props::String
      prop :value, type: Playbook::Props::String
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[radio checkbox],
                     default: "radio"
      prop :input_options, type: Playbook::Props::HashProp,
                           default: {}

      def classname
        generate_classname("pb_item_kit") + checked_class
      end

    private

      def checked_class
        checked ? " checked_item" : ""
      end
    end
  end
end
