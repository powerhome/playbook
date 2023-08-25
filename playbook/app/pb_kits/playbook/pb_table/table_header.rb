# frozen_string_literal: true

module Playbook
  module PbTable
    class TableHeader < Playbook::KitBase
      prop :align, type: Playbook::Props::String,
                   default: "start"
      prop :align_content, type: Playbook::Props::Enum,
                           values: %w[start center end stretch baseline none],
                           default: "center"
      prop :colspan, type: Playbook::Props::Number,
                     default: 1
      prop :placement, type: Playbook::Props::Enum,
                       values: %w[top bottom left right top-start top-end bottom-start bottom-end right-start right-end left-start left-end],
                       default: "bottom-start"
      prop :sort_menu, type: Playbook::Props::HashArray,
                       default: [{}]
      prop :text, type: Playbook::Props::String,
                  default: ""

      def classname
        generate_classname("pb_table_header_kit", align_class)
      end

      def align_class
        align.present? ? "align_#{align}" : nil
      end

      def sort_icon(direction)
        case direction
        when "asc"
          "sort-amount-up"
        when "desc"
          "sort-amount-down"
        else
          ""
        end
      end
    end
  end
end
