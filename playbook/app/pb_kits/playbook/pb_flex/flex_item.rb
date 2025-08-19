# frozen_string_literal: true

module Playbook
  module PbFlex
    class FlexItem < Playbook::KitBase
      prop :fixed_size, default: nil
      prop :grow, type: Playbook::Props::Boolean,
                  default: false
      prop :shrink, type: Playbook::Props::Boolean,
                    default: false

      prop :align_self, type: Playbook::Props::Enum,
                        values: %w[start center end stretch] + [nil],
                        default: nil

      prop :display_flex, type: Playbook::Props::Boolean,
                          default: false

      def classname
        [
          "pb_flex_item_kit",
          fixed_size_class,
          grow_class,
          shrink_class,
          display_flex_class,
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

      def inline_styles
        styles = []
        styles << "flex-basis: #{fixed_size};" if fixed_size.present?
        styles << "height: #{height};" if height.present?
        styles << "min-height: #{min_height};" if min_height.present?
        styles << "max-height: #{max_height};" if max_height.present?
        styles.join(" ")
      end

    private

      def align_self_class
        align_self ? "pb_flex_item_kit_align_self_#{align_self}" : nil
      end

      def display_flex_class
        display_flex ? "pb_flex_item_kit_display_flex" : nil
      end

      def fixed_size_class
        fixed_size.present? ? "pb_flex_item_kit_fixed_size" : nil
      end

      def grow_class
        grow ? "pb_flex_item_kit_grow" : nil
      end

      def shrink_class
        shrink ? "pb_flex_item_kit_shrink" : nil
      end
    end
  end
end
