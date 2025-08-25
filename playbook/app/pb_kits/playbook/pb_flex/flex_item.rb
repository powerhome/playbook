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
        generate_classname("pb_flex_item_kit", fixed_size_class, grow_class, shrink_class, display_flex_class, align_self_class, separator: " ")
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
