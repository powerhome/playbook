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
        wrapped_columns = wrap_leaf_columns(column_definitions)

        rows = []
        max_depth = compute_max_depth(wrapped_columns)
        max_depth.times { rows << [] }
        process_columns(wrapped_columns, rows, 0, max_depth)
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
            rows[current_depth] << { label: col[:label], colspan: colspan }

            process_columns(col[:columns], rows, current_depth + 1, max_depth)
          else
            colspan = 1
            rows[current_depth] << {
              label: col[:label],
              colspan: colspan,
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

      def wrap_leaf_columns(column_definitions)
        has_grouped_headers = column_definitions.any? { |col| col.key?(:columns) }

        if has_grouped_headers
          column_definitions.map do |col|
            if col.key?(:columns)
              {
                label: col[:label],
                columns: wrap_leaf_columns(col[:columns]),
              }
            elsif col.key?(:accessor)
              {
                label: "",
                columns: [col],
              }
            else
              col
            end
          end
        else
          column_definitions
        end
      end
    end
  end
end
