# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class TableBody < Playbook::KitBase
      prop :table_data, type: Playbook::Props::Array,
                        default: []
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []

      def render_row_and_children(row, column_definitions, current_depth = 0)
        output = ActiveSupport::SafeBuffer.new

        output << pb_rails("advanced_table/table_row", props: { row: row, column_definitions: column_definitions, depth: current_depth })

        if row[:children].present?
          row[:children].each do |child_row|
            output << render_row_and_children(child_row, column_definitions, current_depth + 1)
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
