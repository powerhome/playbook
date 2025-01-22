# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class TableHeader < Playbook::KitBase
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []
      prop :enable_toggle_expansion, type: Playbook::Props::Enum,
                                     values: %w[all header none],
                                     default: "header"
      prop :responsive, type: Playbook::Props::Enum,
                        values: %w[none scroll],
                        default: "none"
      prop :is_pinned_left, type: Playbook::Props::Boolean,
                            default: false

      def classname
        additional_classes = []
        additional_classes << "advanced-table-responsive-#{responsive}" if responsive == "scroll"
        additional_classes << "pinned-left" if is_pinned_left && responsive == "scroll"

        generate_classname("pb_advanced_table_header", "pb_table_thead", *additional_classes, separator: " ")
      end

      def th_classname(is_first_column: false)
        additional_classes = []
        additional_classes << "pinned-left" if is_first_column && responsive == "scroll" && is_pinned_left

        generate_classname("table-header-cells", *additional_classes, separator: " ")
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
        total_columns = columns.size
        columns.each_with_index do |col, index|
          is_last = index == total_columns - 1
          if col[:columns]
            colspan = compute_leaf_columns(col[:columns])
            rows[current_depth] << {
              label: col[:label],
              colspan: colspan,
              is_last_in_group: is_last && current_depth.positive?,
            }

            process_columns(col[:columns], rows, current_depth + 1, max_depth)
          else
            colspan = 1
            rows[current_depth] << {
              label: col[:label],
              colspan: colspan,
              accessor: col[:accessor],
              sort_menu: col[:sort_menu],
              is_last_in_group: is_last && current_depth.positive?,
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
        max_depth = compute_max_depth(column_definitions)

        column_definitions.map do |col|
          if col.key?(:columns)
            {
              label: col[:label],
              columns: wrap_leaf_columns(col[:columns]),
            }
          else
            # For leaf columns, wrap with empty labels up to max depth to get proper structure
            wrap_leaf_column(col, max_depth)
          end
        end
      end

      def wrap_leaf_column(col, max_depth)
        wrapped = {
          accessor: col[:accessor],
          label: col[:label] || "",
          sort_menu: col[:sort_menu] || nil,
        }
        (max_depth - 1).times do
          wrapped = { label: "", columns: [wrapped] }
        end
        wrapped
      end
    end
  end
end
