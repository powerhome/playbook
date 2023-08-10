# frozen_string_literal: true

module Playbook
  module PbTable
    class TableHeader < Playbook::KitBase
      prop :colspan, type: Playbook::Props::Number,
                     default: 1
      prop :align, type: Playbook::Props::String,
                   default: "start"

      def classname
        generate_classname("pb_table_header_kit", align_class)
      end

      def align_class
        align.present? ? "align_#{align}" : nil
      end
    end
  end
end
