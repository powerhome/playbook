# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class TableHeader < Playbook::KitBase
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []
      prop :enable_toggle_expansion, type: Playbook::Props::Enum,
                                     values: %w[all header none],
                                     default: "header"
      prop :loading, type: Playbook::Props::Boolean,
                     default: false
      prop :responsive, type: Playbook::Props::Enum,
                        values: %w[none scroll],
                        default: "scroll"
      prop :selectable_rows, type: Playbook::Props::Boolean,
                             default: false
      prop :show_actions_bar, type: Playbook::Props::Boolean,
                              default: true

      def classname
        additional_classes = []
        additional_classes << "advanced-table-responsive-#{responsive} pinned-left" if responsive == "scroll"
        additional_classes << "selectable-rows-enabled" if selectable_rows && enable_toggle_expansion == "none"

        generate_classname("pb_advanced_table_header", "pb_table_thead", *additional_classes, separator: " ")
      end

      def th_classname(is_first_column: false)
        additional_classes = []
        additional_classes << "pinned-left" if is_first_column && responsive == "scroll" && !selectable_rows
        additional_classes << "header-cells-with-actions" if selectable_rows && show_actions_bar

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

      # Selectable Rows No Subrows - checkboxes in their own first cell
      def render_select_all_header
        if selectable_rows
          additional_classes = []
          additional_classes << "table-header-cells-custom"
          additional_classes << "header-cells-with-actions" if show_actions_bar
          additional_classes << "checkbox-cell-header"
          additional_classes << "pinned-left" if responsive == "scroll"
          pb_rails("table/table_header", props: {
                     classname: additional_classes.join(" "),
                   }) do
            pb_rails("checkbox", props: {
                       id: "select-all-rows",
                       name: "select-all-rows",
                     })
          end
        end
      end

      # Selectable Rows w/ Subrows - checkboxes part of toggleable first cell
      def render_select_all_checkbox
        if selectable_rows
          pb_rails("checkbox", props: {
                     id: "select-all-rows",
                     name: "select-all-rows",
                     data: {
                       action: "click->pb-advanced-table#toggleAllRowSelection",
                     },
                   })
        end
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
            raw_styling       = col[:column_styling] || {}
            header_alignment  = raw_styling[:header_alignment]

            colspan = 1
            rows[current_depth] << {
              label: col[:label],
              colspan: colspan,
              accessor: col[:accessor],
              sort_menu: col[:sort_menu],
              is_last_in_group: is_last && current_depth.positive?,
              header_alignment: header_alignment,
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
          column_styling: col[:column_styling] || {},
        }
        (max_depth - 1).times do
          wrapped = { label: "", columns: [wrapped] }
        end
        wrapped
      end
    end
  end
end
