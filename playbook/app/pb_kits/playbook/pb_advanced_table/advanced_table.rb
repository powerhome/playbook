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
      prop :show_actions_bar, type: Playbook::Props::Boolean,
                              default: true
      prop :actions, type: Playbook::Props::Array,
                     default: []
      prop :scroll_bar_none, type: Playbook::Props::Boolean,
                             default: false
      prop :row_styling, type: Playbook::Props::Array,
                         default: []
      prop :inline_row_loading, type: Playbook::Props::Boolean,
                                default: false
      prop :full_width_cell, type: Playbook::Props::Boolean,
                             default: false
      prop :persist_toggle_expansion_button, type: Playbook::Props::Boolean,
                                             default: false
      prop :pinned_rows, type: Playbook::Props::HashProp,
                         default: {}

      def classname
        additional_classes = [
          responsive_classname,
          max_height_classname,
          hide_scroll_bar_class,
          hidden_action_bar_class,
          sticky_header_class,
        ]
        additional_classes << "column-group-border-#{column_group_border_color}" if column_group_border_color != "none"
        additional_classes << "advanced-table-no-table-container" if no_table_card_container?
        generate_classname("pb_advanced_table", *additional_classes, separator: " ")
      end

      def no_table_card_container?
        return false unless table_props.is_a?(Hash)

        table_props[:container] == false || table_props["container"] == false
      end

      def responsive_classname
        responsive == "scroll" ? "advanced-table-responsive-scroll" : "advanced-table-responsive-none"
      end

      def max_height_classname
        max_height.present? ? "advanced-table-max-height-#{max_height}" : ""
      end

      def hide_scroll_bar_class
        scroll_bar_none ? "advanced-table-hide-scrollbar" : ""
      end

      def hidden_action_bar_class
        # Add hidden-action-bar class when action bar functionality is enabled but not currently visible
        selectable_rows && !is_action_bar_visible ? "hidden-action-bar" : ""
      end

      def sticky_header_class
        return "" unless table_props.is_a?(Hash)

        table_props[:sticky] || table_props["sticky"] ? "advanced-table-sticky-header" : ""
      end

      def selected_rows
        @selected_rows ||= []
      end

      def selected_rows_length
        selected_rows.length
      end

      def is_action_bar_visible
        # Action bar visibility is controlled by JS based on selection
        false
      end

      # Mirrors React ColumnLayoutHelper width rules for Rails column_styling.
      # Numbers become px; CSS length strings pass through.
      # width alone locks min_width and max_width to the same value (fixed column).
      def self.css_length(value)
        return nil if value.nil? || value == ""

        return "#{value}px" if value.is_a?(Numeric)

        value.to_s
      end

      def self.build_column_layout_styles(column_styling)
        return {} unless column_styling.is_a?(Hash)

        width = read_styling_length(column_styling, :width)
        min_width = read_styling_length(column_styling, :min_width, :minWidth)
        max_width = read_styling_length(column_styling, :max_width, :maxWidth)

        has_width = !width.nil? && width != ""
        has_min = !min_width.nil? && min_width != ""
        has_max = !max_width.nil? && max_width != ""

        width_value = has_width ? width : nil
        min_value = has_min ? min_width : nil
        max_value = has_max ? max_width : nil

        if has_width && !has_min && !has_max
          min_value = width
          max_value = width
          width_value = width
        end

        styles = {}
        width_css = css_length(width_value)
        min_css = css_length(min_value)
        max_css = css_length(max_value)

        styles[:width] = width_css if width_css
        styles[:min_width] = min_css if min_css
        styles[:max_width] = max_css if max_css
        styles
      end

      def self.read_styling_length(styling, *keys)
        keys.each do |key|
          value = styling[key] || styling[key.to_s]
          return value unless value.nil?
        end
        nil
      end
      private_class_method :read_styling_length
    end
  end
end
