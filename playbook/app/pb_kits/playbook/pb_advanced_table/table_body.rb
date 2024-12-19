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

      def render_row_and_children(row, column_definitions, current_depth, first_parent_child)
        output = ActiveSupport::SafeBuffer.new
        is_first_child_of_subrow = current_depth.positive? && first_parent_child && subrow_headers[current_depth - 1].present?

        output << pb_rails("advanced_table/table_subrow_header", props: { row: row, column_definitions: column_definitions, depth: current_depth, subrow_header: subrow_headers[current_depth - 1] }) if is_first_child_of_subrow && enable_toggle_expansion == "all"

        output << pb_rails("advanced_table/table_row", props: { id: id, row: row, column_definitions: column_definitions, depth: current_depth, collapsible_trail: collapsible_trail })

        if row[:children].present?
          output << content_tag(:div, class: "toggle-content", data: { advanced_table_content: row.object_id.to_s + id }) do
            row[:children].map do |child_row|
              render_row_and_children(child_row, column_definitions, current_depth + 1, row.children.first == child_row)
            end.join.html_safe
          end
        end

        output
      end

      def classname
        generate_classname("pb_advanced_table_body", "pb_table_tbody", separator: " ")
      end
    end
  end
end
