# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class AdvancedTableBody < Playbook::KitBase
      prop :table_data, type: Playbook::Props::Array,
                        default: []
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []
      def td_classname
        generate_classname("id-cell", "chrome-styles", separator: " ")
      end

      def classname
        generate_classname("pb_advanced_table_body", "pb_table_tbody", separator: " ")
      end
    end
  end
end
