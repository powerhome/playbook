# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class AdvancedTableHeader < Playbook::KitBase
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []

      def classname
        generate_classname("pb_advanced_table_header", "pb_table_thead", separator: " ")
      end
    end
  end
end
