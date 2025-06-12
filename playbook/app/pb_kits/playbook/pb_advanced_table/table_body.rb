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

      def leaf_columns
        @leaf_columns ||= flatten_columns(column_definitions)
      end

      # Recursively render a row and its children, using memoized leaf_columns
      def render_row_and_children(row,
                                  current_depth = 0,
                                  ancestor_ids  = [],
                                  top_parent_id = nil,
                                  first_child: false,
                                  additional_classes: "",
                                  table_data_attributes: {})
        top_parent_id ||= row.object_id
        new_ancestors = ancestor_ids + [row.object_id]

        # Prepare data attributes for this row
        attrs = if current_depth.zero?
                  { row_depth: 0,
                    advanced_table_content: row.object_id.to_s,
                    row_parent: nil }
                else
                  table_data_attributes
                end

        output = ActiveSupport::SafeBuffer.new

        # Optional subrow header
        if current_depth.positive? && first_child && subrow_headers[current_depth - 1]
          sub_attrs = {
            advanced_table_content: (ancestor_ids + ["#{row.object_id}sr"]).join("-"),
            row_depth: current_depth,
            row_parent: "#{id}_#{ancestor_ids.last}",
          }
          output << pb_rails(
            "advanced_table/table_subrow_header",
            props: {
              row: row,
              column_definitions: leaf_columns,
              depth: current_depth,
              subrow_header: subrow_headers[current_depth - 1],
              collapsible_trail: collapsible_trail,
              classname: "toggle-content",
              responsive: responsive,
              subrow_data_attributes: sub_attrs,
            }
          )
        end

        # Main row
        output << pb_rails(
          "advanced_table/table_row",
          props: {
            id: id,
            row: row,
            column_definitions: leaf_columns,
            depth: current_depth,
            collapsible_trail: collapsible_trail,
            classname: additional_classes,
            table_data_attributes: attrs,
            responsive: responsive,
            loading: loading,
            selectable_rows: selectable_rows,
            row_id: row[:id],
            enable_toggle_expansion: enable_toggle_expansion,
          }
        )

        # Render children if present
        if row[:children]&.any?
          row[:children].each_with_index do |child, idx|
            child_attrs = {
              top_parent: "#{id}_#{top_parent_id}",
              row_depth: current_depth + 1,
              row_parent: "#{id}_#{row.object_id}",
              advanced_table_content: (new_ancestors + [child.object_id]).join("-"),
            }

            output << render_row_and_children(
              child,
              current_depth + 1,
              new_ancestors,
              top_parent_id,
              first_child: idx.zero?,
              additional_classes: "toggle-content",
              table_data_attributes: child_attrs
            )
          end
        end

        output
      end

      # Flatten columns, preserving group metadata
      def flatten_columns(columns)
        columns.flat_map do |col|
          if col[:columns]
            flatten_columns(col[:columns])
          elsif col[:accessor].present?
            if column_definitions.any? { |c| c.key?(:columns) }
              col.merge(is_last_in_group: columns.last[:accessor] == col[:accessor])
            else
              col
            end
          end
        end.compact
      end

      def classname
        additional_classes = []
        additional_classes << "advanced-table-responsive-#{responsive} pinned-left" if responsive == "scroll"
        additional_classes << "selectable-rows-enabled" if selectable_rows && enable_toggle_expansion == "none"
        generate_classname("pb_advanced_table_body", *additional_classes, separator: " ")
      end

      def pinned_cell_class(index)
        index.zero? && responsive == "scroll" ? "pinned-left" : ""
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
