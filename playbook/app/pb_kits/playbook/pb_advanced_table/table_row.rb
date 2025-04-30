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
      prop :collapsible_trail, type: Playbook::Props::Boolean,
                               default: true
      prop :table_data_attributes, type: Playbook::Props::HashProp,
                                   default: {}
      prop :loading, type: Playbook::Props::Boolean,
                     default: false
      prop :responsive, type: Playbook::Props::Enum,
                        values: %w[none scroll],
                        default: "scroll"
      prop :is_pinned_left, type: Playbook::Props::Boolean,
                            default: false
      prop :selectable_rows, type: Playbook::Props::Boolean,
                             default: false
      prop :row_id, type: Playbook::Props::String,
                    default: ""
      prop :enable_toggle_expansion, type: Playbook::Props::Enum,
                                     values: %w[all header none],
                                     default: "header"

      def data
        Hash(prop(:data)).merge(table_data_attributes)
      end

      def classname
        generate_classname("pb_table_tr", "bg-white", subrow_depth_classname, separator: " ")
      end

      def td_classname(column, index)
        classes = %w[id-cell chrome-styles]
        classes << "last-cell" if column[:is_last_in_group]
        classes << "pinned-left" if index.zero? && is_pinned_left && responsive == "scroll"
        classes.join(" ")
      end

      def depth_accessors
        column_definitions.flat_map do |column|
          column[:cellAccessors] if column.key?(:cellAccessors)
        end.compact
      end

      # Selectable Rows No Subrows - checkboxes in their own first cell
      def render_checkbox_cell
        if selectable_rows
          pb_rails("table/table_cell", props: {
                     classname: "checkbox-cell",
                   }) do
            pb_rails("checkbox", props: {
                       id: "select-row-#{row_id || row.object_id}",
                       name: "select-row-#{row_id || row.object_id}",
                       data: {
                         row_id: row_id || row.object_id.to_s,
                         flat_advanced_table_select: true,
                       },
                     })
          end
        end
      end

      # Selectable Rows w/ Subrows - checkboxes part of toggleable first cell
      def render_row_checkbox
        if selectable_rows
          pb_rails("checkbox", props: {
                     id: "select-row-#{row_id || row.object_id}",
                     name: "select-row-#{row_id || row.object_id}",
                     data: {
                       row_id: row_id || row.object_id.to_s,
                     },
                   })
        end
      end

    private

      def custom_renderer_value(column, index)
        return nil unless column[:accessor].present?

        if index.zero?
          if depth.zero?
            row[column[:accessor].to_sym]
          else
            depth_accessors.each_with_index do |item, accessor_index|
              key = item.to_sym
              return row[key] if depth - 1 == accessor_index
            end
            nil
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
