# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class AdvancedTableBody < Playbook::KitBase
      prop :table_data, type: Playbook::Props::Array,
                        default: []
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []

      def render_row_and_children(row, column_definitions)
        output = ActiveSupport::SafeBuffer.new

        output << pb_rails("advanced_table/advanced_table_row", props: { row: row, column_definitions: column_definitions })

        if row[:children].present?
          row[:children].each do |child_row|
            output << render_row_and_children(child_row, column_definitions)
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
