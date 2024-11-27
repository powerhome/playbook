# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class TableRow < Playbook::KitBase
      prop :id, type: Playbook::Props::String,
                default: ""
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

      def depth_accessors
        column_definitions.flat_map do |column|
          column[:cellAccessors] if column.key?(:cellAccessors)
        end.compact
      end

    private

      def custom_renderer_value(column, index)
        if index.zero?
          if depth.zero?
            row[column[:accessor].to_sym]
          else
            depth_accessors.each_with_index do |item, accessor_index|
              key = item.to_sym
              return row[key] if depth - 1 == accessor_index
            end
          end
        else
          row[column[:accessor].to_sym]
        end
      end

      def subrow_depth_classname
        depth.positive? ? "depth-sub-row-#{depth}" : ""
      end
    end
  end
end
