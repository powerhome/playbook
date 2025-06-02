# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class TableActionBar < Playbook::KitBase
      prop :actions, type: Playbook::Props::Array,
                     default: []
      prop :is_visible, type: Playbook::Props::Boolean,
                        default: false
      prop :selected_count, type: Playbook::Props::Number,
                            default: 0

      def classname
        # Just use row-selection-actions-card as the base class
        generate_classname("row-selection-actions-card", separator: " ")
      end
    end
  end
end
