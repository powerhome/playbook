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
      prop :subrow_data_attributes, type: Playbook::Props::HashProp,
                                    default: {}

      def data
        Hash(prop(:data)).merge(subrow_data_attributes)
      end

      def classname
        generate_classname("pb_table_tr", "bg-white", "pb_subrow_header", subrow_depth_classname, separator: " ")
      end

    private

      def subrow_depth_classname
        depth.positive? ? "depth-sub-row-#{depth}" : ""
      end
    end
  end
end
