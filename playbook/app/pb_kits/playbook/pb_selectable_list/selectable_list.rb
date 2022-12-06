# frozen_string_literal: true

require "securerandom"

module Playbook
  module PbSelectableList
    class SelectableList < Playbook::KitBase
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[radio checkbox],
                     default: "checkbox"

      prop :text, type: Playbook::Props::String

      prop :items, type: Playbook::Props::Array,
                   default: []

      def classname
        generate_classname("pb_selectable_list_kit")
      end

      def get_id(item)
        item[:id] || ("a".."z").to_a.sample(12).join
      end
    end
  end
end
