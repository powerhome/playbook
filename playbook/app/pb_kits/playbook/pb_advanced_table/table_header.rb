# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class TableHeader < Playbook::KitBase
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []
      prop :enable_toggle_expansion, type: Playbook::Props::Enum,
                                     values: %w[all header none],
                                     default: "header"

      def classname
        generate_classname("pb_advanced_table_header", "pb_table_thead", separator: " ")
      end

      def th_classname
        generate_classname("table-header-cells", separator: " ")
      end

      def header_rows
        rows = []
        max_depth = compute_max_depth(column_definitions)

        max_depth.times { rows << [] }

        process_columns(column_definitions, rows, 0, max_depth)

        rows
      end

    private

      def compute_max_depth(columns)
        columns.map do |col|
          col[:columns] ? 1 + compute_max_depth(col[:columns]) : 1
        end.max || 1
      end

      def process_columns(columns, rows, current_depth, max_depth)
        columns.each do |col|
          if col[:columns]
            colspan = compute_leaf_columns(col[:columns])
            rowspan = 1
            rows[current_depth] << { label: col[:label], colspan: colspan, rowspan: rowspan }

            process_columns(col[:columns], rows, current_depth + 1, max_depth)
          else
            colspan = 1
            rowspan = max_depth - current_depth
            rows[current_depth] << {
              label: col[:label],
              colspan: colspan,
              rowspan: rowspan,
              accessor: col[:accessor],
              sort_menu: col[:sort_menu],
            }
          end
        end
      end

      def compute_leaf_columns(columns)
        columns.reduce(0) do |sum, col|
          col[:columns] ? sum + compute_leaf_columns(col[:columns]) : sum + 1
        end
      end
    end
  end
end
