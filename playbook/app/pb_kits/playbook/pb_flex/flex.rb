# frozen_string_literal: true

module Playbook
  module PbFlex
    class Flex < Playbook::KitBase
      prop :horizontal, type: Playbook::Props::Enum,
                        values: %w[left center right stretch none],
                        default: "left",
                        deprecated: true

      prop :justify, type: Playbook::Props::Enum,
                     values: %w[start center end stretch around between evenly none],
                     default: "none"

      prop :inline, type: Playbook::Props::Boolean,
                    default: false

      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[row column],
                         default: "row"

      prop :spacing, type: Playbook::Props::Enum,
                     values: %w[around between evenly none],
                     default: "none",
                     deprecated: true

      prop :gap, type: Playbook::Props::Enum,
                 values: %w[xxs xs sm md lg xl none],
                 default: "none"

      prop :row_gap, type: Playbook::Props::Enum,
                     values: %w[xxs xs sm md lg xl none],
                     default: "none"

      prop :column_gap, type: Playbook::Props::Enum,
                        values: %w[xxs xs sm md lg xl none],
                        default: "none"

      prop :reverse, type: Playbook::Props::Boolean,
                     default: false

      prop :vertical, type: Playbook::Props::Enum,
                      values: %w[top center bottom stretch baseline none],
                      default: "top",
                      deprecated: true

      prop :align, type: Playbook::Props::Enum,
                   values: %w[start center end stretch baseline none],
                   default: "none"

      prop :align_self, type: Playbook::Props::Enum,
                        values: %w[start end center stretch none],
                        default: "none"

      prop :wrap, type: Playbook::Props::Boolean,
                  default: false

      def classname
        [
          "pb_flex_kit",
          orientation_class,
          justify_class,
          align_class,
          inline_class,
          reverse_class,
          wrap_class,
          spacing_class,
          gap_class,
          row_gap_class,
          column_gap_class,
          align_self_class,
          prop(:classname),
          spacing_props,
          dark_props,
          width_props,
          min_width_props,
          max_width_props,
          gap_props,
          z_index_props,
          number_spacing_props,
          shadow_props,
          line_height_props,
          display_props,
          cursor_props,
          flex_direction_props,
          flex_wrap_props,
          justify_content_props,
          justify_self_props,
          align_items_props,
          align_content_props,
          align_self_props,
          flex_props,
          flex_grow_props,
          flex_shrink_props,
          order_props,
          position_props,
          hover_props,
          border_radius_props,
          text_align_props,
          overflow_props,
          truncate_props,
          left_props,
          top_props,
          right_props,
          bottom_props,
          vertical_align_props,
          height_props,
          min_height_props,
          max_height_props,
        ].compact.flatten.join(" ")
      end

    private

      def orientation_class
        "pb_flex_kit_orientation_#{orientation}"
      end

      def horizontal_class
        if orientation == "row"
          "pb_flex_kit_justify_content_#{horizontal}"
        elsif align == "none"
          "pb_flex_kit_align_items_#{horizontal}"
        end
      end

      def justify_class
        if justify == "none"
          horizontal_class
        else
          "pb_flex_kit_justify_content_#{justify}"
        end
      end

      def inline_class
        inline ? "pb_flex_kit_inline" : nil
      end

      def spacing_class
        spacing != "none" ? "pb_flex_kit_spacing_#{spacing}" : nil
      end

      def reverse_class
        reverse ? "pb_flex_kit_reverse" : nil
      end

      def vertical_class
        if orientation == "row"
          "pb_flex_kit_align_items_#{vertical}"
        elsif justify == "none"
          "pb_flex_kit_justify_content_#{vertical}"
        end
      end

      def align_class
        if align == "none"
          vertical_class
        else
          "pb_flex_kit_align_items_#{align}"
        end
      end

      def align_self_class
        if align_self == "none"
          nil
        else
          "pb_flex_kit_align_self_#{align_self}"
        end
      end

      def wrap_class
        wrap ? "pb_flex_kit_wrap" : nil
      end

      def gap_class
        if gap == "none"
          nil
        else
          "pb_flex_kit_gap_#{gap}"
        end
      end

      def row_gap_class
        if row_gap == "none"
          nil
        else
          "pb_flex_kit_rowGap_#{row_gap}"
        end
      end

      def column_gap_class
        if column_gap == "none"
          nil
        else
          "pb_flex_kit_columnGap_#{column_gap}"
        end
      end
    end
  end
end
