# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class AdvancedTable < Playbook::KitBase
      prop :table_data, type: Playbook::Props::Array,
                        default: []
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []
      prop :enable_toggle_expansion, type: Playbook::Props::Enum,
                                     values: %w[all header none],
                                     default: "header"
      prop :loading, type: Playbook::Props::Boolean,
                     default: false
      prop :responsive, type: Playbook::Props::Enum,
                        values: %w[none scroll],
                        default: "scroll"
      prop :table_props, type: Playbook::Props::HashProp,
                         default: {}
      prop :max_height, type: Playbook::Props::Enum,
                        values: %w[auto xs sm md lg xl xxl xxxl],
                        default: "auto"

      def classname
        generate_classname("pb_advanced_table", responsive_classname, max_height_classname, separator: " ")
      end

      def responsive_classname
        responsive == "scroll" ? "advanced-table-responsive-scroll" : "advanced-table-responsive-none"
      end

      def max_height_classname
        max_height.present? ? "advanced-table-max-height-#{max_height}" : ""
      end
    end
  end
end
