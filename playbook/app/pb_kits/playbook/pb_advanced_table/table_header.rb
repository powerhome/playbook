# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class TableHeader < Playbook::KitBase
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []

      def classname
        generate_classname("pb_advanced_table_header", "pb_table_thead", separator: " ")
      end

      def th_classname
        generate_classname("table-header-cells", separator: " ")
      end
    end
  end
end
