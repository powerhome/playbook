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
      prop :responsive, type: Playbook::Props::Enum,
                        values: %w[none scroll],
                        default: "scroll"
      prop :is_pinned_row, type: Playbook::Props::Boolean,
                           default: false
      prop :pinned_index, type: Playbook::Props::Numeric,
                          default: nil
      prop :html_options, type: Playbook::Props::HashProp,
                          default: {}

      def data
        Hash(prop(:data)).merge(subrow_data_attributes)
      end

      def classname
        classes = ["pb_table_tr", "bg-silver", "pb_subrow_header", subrow_depth_classname]
        classes << "pinned-row" if is_pinned_row
        generate_classname(*classes, separator: " ")
      end

      def td_classname(index)
        classes = %w[id-cell]
        classes << "pinned-left" if index.zero? && responsive == "scroll"
        classes.join(" ")
      end

    private

      def subrow_depth_classname
        depth.positive? ? "depth-sub-row-#{depth}" : ""
      end
    end
  end
end
