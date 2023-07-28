# frozen_string_literal: true

module Playbook
  module PbTable
    class TableHeader < Playbook::KitBase
      prop :side_highlight_color, type: Playbook::Props::String,
                                  default: "none"

      prop :colspan, type: Playbook::Props::Numeric,
                     default: 1

      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"

      def classname
        generate_classname("pb_table_header_kit", side_highlight_class)
      end

      def side_highlight_class
        side_highlight_color.present? ? "side_highlight_#{side_highlight_color}" : nil
      end
    end
  end
end
