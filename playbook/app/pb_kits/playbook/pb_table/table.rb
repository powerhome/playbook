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

      def classname
        generate_classname(
          "pb_table", "table-#{size}", single_line_class, dark_class,
          disable_hover_class, container_class, data_table_class, sticky_class, collapse_class,
          vertical_border_class, striped_class, outer_padding_class,
          "table-responsive-#{responsive}", separator: " "
        )
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
        container ? "table-card" : nil
      end

      def collapse_class
        responsive != "none" ? "table-collapse-#{collapse}" : ""
      end

      def sticky_class
        sticky ? "sticky-header" : nil
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
    end
  end
end
