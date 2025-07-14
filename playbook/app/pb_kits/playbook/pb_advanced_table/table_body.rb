# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class TableBody < Playbook::KitBase
      prop :id, type: Playbook::Props::String,
                default: ""
      prop :table_data, type: Playbook::Props::Array,
                        default: []
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []
      prop :enable_toggle_expansion, type: Playbook::Props::Enum,
                                     values: %w[all header none],
                                     default: "header"
      prop :subrow_headers, type: Playbook::Props::Array,
                            default: []
      prop :collapsible_trail, type: Playbook::Props::Boolean,
                               default: true
      prop :loading, type: Playbook::Props::Boolean,
                     default: false
      prop :responsive, type: Playbook::Props::Enum,
                        values: %w[none scroll],
                        default: "scroll"
      prop :selectable_rows, type: Playbook::Props::Boolean,
                             default: false
      prop :row_styling, type: Playbook::Props::Array,
                         default: []

      def flatten_columns(columns)
        columns.flat_map do |col|
          if col[:columns]
            flatten_columns(col[:columns])
          elsif col[:accessor].present?
            if has_grouped_headers?
              col.merge(is_last_in_group: last_in_group?(columns, col))
            else
              col
            end
          end
        end.compact
      end

      def render_row_and_children(row, column_definitions, current_depth, first_parent_child, ancestor_ids = [], top_parent_id = nil, additional_classes: "", table_data_attributes: {})
        top_parent_id ||= row.object_id
        new_ancestor_ids = ancestor_ids + [row.object_id]
        leaf_columns = flatten_columns(column_definitions)

        output = ActiveSupport::SafeBuffer.new
        is_first_child_of_subrow = current_depth.positive? && first_parent_child && subrow_headers[current_depth - 1].present?

        subrow_ancestor_ids = ancestor_ids + ["#{row.object_id}sr"]
        subrow_data_attributes = {
          advanced_table_content: subrow_ancestor_ids.join("-"),
          row_depth: current_depth,
          row_parent: "#{id}_#{ancestor_ids.last}",
        }
        # Subrow header if applicable
        output << pb_rails("advanced_table/table_subrow_header", props: { row: row, column_definitions: leaf_columns, depth: current_depth, subrow_header: subrow_headers[current_depth - 1], collapsible_trail: collapsible_trail, classname: "toggle-content", responsive: responsive, subrow_data_attributes: subrow_data_attributes }) if is_first_child_of_subrow && enable_toggle_expansion == "all"

        current_data_attributes = if current_depth.zero?
                                    {
                                      row_depth: 0,
                                      advanced_table_content: row.object_id.to_s,
                                      row_parent: nil,
                                    }
                                  else
                                    table_data_attributes
                                  end

        # Additional class and data attributes needed for toggle logic
        output << pb_rails("advanced_table/table_row", props: { id: id, row: row, column_definitions: leaf_columns, depth: current_depth, collapsible_trail: collapsible_trail, classname: additional_classes, table_data_attributes: current_data_attributes, responsive: responsive, loading: loading, selectable_rows: selectable_rows, row_id: row[:id], enable_toggle_expansion: enable_toggle_expansion, row_styling: row_styling })

        if row[:children].present?
          row[:children].each do |child_row|
            is_first_child = row[:children].first == child_row
            immediate_parent_id = row.object_id
            data_content = new_ancestor_ids.join("-") + "-#{child_row.object_id}"

            child_data_attributes = {
              top_parent: "#{id}_#{top_parent_id}",
              row_depth: current_depth + 1,
              row_parent: "#{id}_#{immediate_parent_id}",
              advanced_table_content: data_content,
            }

            output << render_row_and_children(child_row, column_definitions, current_depth + 1, is_first_child, new_ancestor_ids, top_parent_id, additional_classes: "toggle-content", table_data_attributes: child_data_attributes)
          end
        end

        output
      end

      def classname
        additional_classes = []
        additional_classes << "advanced-table-responsive-#{responsive} pinned-left" if responsive == "scroll"
        additional_classes << "selectable-rows-enabled" if selectable_rows && enable_toggle_expansion == "none"
        generate_classname("pb_advanced_table_body", *additional_classes, separator: " ")
      end

      def pinned_cell_class(index)
        return "pinned-left" if index.zero? && responsive == "scroll"

        ""
      end

    private

      def has_grouped_headers?
        column_definitions.any? { |col| col.key?(:columns) }
      end

      def last_in_group?(columns, current_col)
        columns.last[:accessor] == current_col[:accessor]
      end
    end
  end
end
