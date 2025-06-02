# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class AdvancedTable < Playbook::KitBase
      prop :table_data, type: Playbook::Props::Array,
                        default: []
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []
      prop :column_group_border_color, type: Playbook::Props::Enum,
                                       values: %w[text_lt_default text_lt_light text_lt_lighter text_dk_default text_dk_light text_dk_lighter none],
                                       default: "none"
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
      prop :selectable_rows, type: Playbook::Props::Boolean,
                             default: false
      prop :scroll_bar_none, type: Playbook::Props::Boolean,
                             default: false

      def classname
        additional_classes = [responsive_classname, max_height_classname, scrollbar_none_class]
        additional_classes << "column-group-border-#{column_group_border_color}" if column_group_border_color != "none"
        generate_classname("pb_advanced_table", *additional_classes, separator: " ")
      end

      def responsive_classname
        responsive == "scroll" ? "advanced-table-responsive-scroll" : "advanced-table-responsive-none"
      end

      def max_height_classname
        max_height.present? ? "advanced-table-max-height-#{max_height}" : ""
      end

      def scrollbar_none_class
        scroll_bar_none ? "advanced-table-hide-scrollbar " : ""
      end

      def selected_rows
        @selected_rows ||= []
      end

      def selected_rows_length
        selected_rows.length
      end
    end
  end
end
