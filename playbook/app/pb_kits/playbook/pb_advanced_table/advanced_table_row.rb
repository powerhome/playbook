# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class AdvancedTableRow < Playbook::KitBase
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []
      prop :row
      prop :depth

      def classname
        generate_classname("pb_table_tr", "bg-white", subrow_depth_classname, separator: " ")
      end

      def td_classname
        generate_classname("id-cell", "chrome-styles", separator: " ")
      end

    private

      def subrow_depth_classname
        depth.positive? ? "depth-sub-row-#{depth}" : ""
      end
    end
  end
end
