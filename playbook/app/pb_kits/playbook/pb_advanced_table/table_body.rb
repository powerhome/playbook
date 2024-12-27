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

      def flatten_columns(columns)
        columns.flat_map do |col|
          if col[:columns]
            flatten_columns(col[:columns])
          elsif col[:accessor].present?
            col
          end
        end.compact
      end

      def render_row_and_children(row, column_definitions, current_depth, first_parent_child, ancestor_ids = [], top_parent_id = nil)
        top_parent_id ||= row.object_id
        new_ancestor_ids = ancestor_ids + [row.object_id]
        leaf_columns = flatten_columns(column_definitions)

        output = ActiveSupport::SafeBuffer.new
        is_first_child_of_subrow = current_depth.positive? && first_parent_child && subrow_headers[current_depth - 1].present?

        output << pb_rails("advanced_table/table_subrow_header", props: { row: row, column_definitions: column_definitions, depth: current_depth, subrow_header: subrow_headers[current_depth - 1], collapsible_trail: collapsible_trail }) if is_first_child_of_subrow && enable_toggle_expansion == "all"

        # Pass only leaf_columns to table_row to account for multiple nested columns
        output << pb_rails("advanced_table/table_row", props: {
                             id: id,
                             row: row,
                             column_definitions: leaf_columns,
                             depth: current_depth,
                             collapsible_trail: collapsible_trail,
                           })

        if row[:children].present?
          output << row[:children].map do |child_row|
            is_first_child = row[:children].first == child_row

            child_output = render_row_and_children(child_row, column_definitions, current_depth + 1, is_first_child, new_ancestor_ids, top_parent_id)

            immediate_parent_id = row.object_id
            top_parent = top_parent_id
            # Combine ancestor_ids to build the content id
            data_content = new_ancestor_ids.join("-") + "-#{child_row.object_id}"

            child_output.to_str.sub("<tr", %(<tr class="toggle-content" data-top-parent="#{top_parent}" data-row-depth="#{current_depth}" data-row-parent="#{immediate_parent_id}" data-advanced-table-content="#{data_content}"))
          end.join.html_safe
        end

        output
      end

      def classname
        generate_classname("pb_advanced_table_body", separator: " ")
      end
    end
  end
end
