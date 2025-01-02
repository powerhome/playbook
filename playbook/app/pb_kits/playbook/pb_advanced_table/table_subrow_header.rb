# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class TableSubrowHeader < Playbook::KitBase
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []
      prop :depth
      prop :row
      prop :enable_toggle_expansion, type: Playbook::Props::Enum,
                                     values: %w[all header none],
                                     default: "header"
      prop :subrow_header, type: Playbook::Props::String,
                           default: ""
      prop :collapsible_trail, type: Playbook::Props::Boolean,
                               default: true

      def classname
        generate_classname("pb_table_tr", "bg-white", subrow_depth_classname, separator: " ")
      end

      def td_classname
        generate_classname("id-cell", "chrome-styles", separator: " ")
      end

    private

      def subrow_depth_classname
        depth.positive? ? "depth-sub-row-#{depth}" : ""
      end
    end
  end
end
