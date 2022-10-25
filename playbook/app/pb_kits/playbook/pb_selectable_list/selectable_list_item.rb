# frozen_string_literal: true

module Playbook
  module PbSelectableList
    class SelectableListItem < Playbook::KitBase
      prop :tabindex

      prop :checked, type: Playbook::Props::Boolean,
                     default: false
      prop :name, type: Playbook::Props::String
      prop :text, type: Playbook::Props::String
      prop :value, type: Playbook::Props::String
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[radio checkbox],
                     default: "radio"
      prop :input_options, type: Playbook::Props::Hash,
                           default: {}

      def classname
        generate_classname("pb_item_kit")
      end
    end
  end
end
