# frozen_string_literal: true

module Playbook
  module PbTable
    class TableRow
      include Playbook::Props

      partial "pb_table/table_row"

      prop :side_highlight_color, type: Playbook::Props::String,
                                  default: "none"

      def classname
        generate_classname("pb_table_row_kit", side_highlight_class)
      end

      def side_highlight_class
        side_highlight_color.present? ? "side_highlight_#{side_highlight_color}" : nil
      end
    end
  end
end
