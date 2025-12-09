# frozen_string_literal: true

module Playbook
  module PbTable
    class Table < Playbook::KitBase
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg],
                  default: "md"
      prop :single_line, type: Playbook::Props::Boolean,
                         default: false
      prop :disable_hover, type: Playbook::Props::Boolean,
                           default: false
      prop :data_table, type: Playbook::Props::Boolean,
                        default: false
      prop :container, type: Playbook::Props::Boolean,
                       default: true
      prop :responsive, type: Playbook::Props::Enum,
                        values: %w[collapse scroll none],
                        default: "collapse"
      prop :collapse, type: Playbook::Props::Enum,
                      values: %w[sm md lg],
                      default: "sm"
      prop :text
      prop :sticky, type: Playbook::Props::Boolean,
                    default: false
      prop :sticky_left_column, type: Playbook::Props::Array,
                                default: []
      prop :sticky_right_column, type: Playbook::Props::Array,
                                 default: []
      prop :vertical_border, type: Playbook::Props::Boolean,
                             default: false
      prop :striped, type: Playbook::Props::Boolean,
                     default: false
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[table div],
                 default: "table"
      prop :outer_padding, type: Playbook::Props::Enum,
                           values: ["none", "xxs", "xs", "sm", "md", "lg", "xl", nil],
                           default: nil
      prop :header_style, type: Playbook::Props::Enum,
                          values: %w[default borderless floating],
                          default: "default"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default with_filter],
                     default: "default"
      prop :filter_props, type: Playbook::Props::HashProp,
                          default: {}
      prop :filter_content
      prop :title, type: Playbook::Props::String,
                   default: nil

      def classname
        generate_classname(
          "pb_table", "table-#{size}", single_line_class, dark_class,
          disable_hover_class, container_class, data_table_class, sticky_class, sticky_left_column_class,
          sticky_right_column_class, collapse_class, vertical_border_class, striped_class, outer_padding_class,
          "table-responsive-#{responsive}", header_style_class, separator: " "
        )
      end

      def responsive_classname
        responsive ? "table-responsive-#{responsive}" : nil
      end

      def with_filter_variant?
        variant == "with_filter"
      end

    private

      def dark_class
        dark ? "table-dark" : nil
      end

      def data_table_class
        data_table ? "data_table" : nil
      end

      def single_line_class
        single_line ? "single-line" : nil
      end

      def disable_hover_class
        disable_hover ? "no-hover" : nil
      end

      def container_class
        effective_container = variant == "with_filter" ? false : container
        effective_container ? "table-card" : nil
      end

      def collapse_class
        effective_collapse = variant == "with_filter" && collapse == "sm" ? "md" : collapse
        responsive != "none" ? "table-collapse-#{effective_collapse}" : ""
      end

      def sticky_class
        sticky ? "sticky-header" : nil
      end

      def sticky_left_column_class
        if sticky_left_column.empty?
          nil
        else
          sticky_col_classname = "sticky-left-column sticky-left-columns-ids"
          sticky_left_column.each do |id|
            sticky_col_classname += "-#{id}"
          end

          sticky_col_classname
        end
      end

      def sticky_right_column_class
        if sticky_right_column.empty?
          nil
        else
          sticky_col_classname = "sticky-right-column sticky-right-columns-ids"
          sticky_right_column.each do |id|
            sticky_col_classname += "-#{id}"
          end

          sticky_col_classname
        end
      end

      def striped_class
        striped ? "striped" : nil
      end

      def vertical_border_class
        vertical_border ? "vertical-border" : nil
      end

      def outer_padding_class
        if outer_padding.nil?
          outer_padding
        else
          space_css_name = outer_padding != "none" ? "space_" : ""
          outer_padding.present? ? "outer_padding_#{space_css_name}#{outer_padding}" : nil
        end
      end

      def header_style_class
        case header_style
        when "borderless"
          "header-borderless"
        when "floating"
          "header-floating"
        end
      end
    end
  end
end
