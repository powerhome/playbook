# frozen_string_literal: true

module Playbook
  module PbTable
    class TableRow < Playbook::KitBase
      prop :side_highlight_color, type: Playbook::Props::String,
                                  default: "none"
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[table div],
                 default: "table"
      prop :collapsible, type: Playbook::Props::Boolean,
                         default: false
      prop :collapsible_content
      prop :collapsible_side_highlight, type: Playbook::Props::Boolean,
                                        default: true

      def classname
        generate_classname("pb_table_row_kit", side_highlight_class) + tag_class
      end

      def side_highlight_class
        side_highlight_color.present? ? "side_highlight_#{side_highlight_color}" : nil
      end

      def tag_class
        " pb_table_tr"
      end
    end
  end
end
