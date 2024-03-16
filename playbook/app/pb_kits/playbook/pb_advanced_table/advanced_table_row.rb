# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class AdvancedTableRow < Playbook::KitBase
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []
      prop :row

      def classname
        generate_classname("pb_table_tr", "bg-white", separator: " ")
      end

      def td_classname
        generate_classname("id-cell", "chrome-styles", separator: " ")
      end
    end
  end
end
