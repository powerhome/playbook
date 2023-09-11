# frozen_string_literal: true

module Playbook
  module PbTable
    class TableCol < Playbook::KitBase
      prop :span, type: Playbook::Props::Number,
                  default: 1
      prop :background_color

      def classname
        if background_color.present?
          generate_classname("pb_background_kit", "pb_background_color_#{background_color}", "pb_table_col_kit", separator: " ")
        else
          generate_classname("pb_table_col_kit")
        end
      end
    end
  end
end
