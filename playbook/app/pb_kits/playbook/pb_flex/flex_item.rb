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
        generate_classname("pb_flex_item_kit", fixed_size_class, grow_class, shrink_class, display_flex_class) + align_self_class
      end

      def inline_styles
        styles = []
        styles << "flex-basis: #{fixed_size};" if fixed_size.present?
        styles << "height: #{height};" if height.present?
        styles.join(" ")
      end

    private

      def align_self_class
        align_self ? "align_self_#{align_self}" : ""
      end

      def display_flex_class
        display_flex ? "display_flex" : nil
      end

      def fixed_size_class
        fixed_size.present? ? "fixed_size" : nil
      end

      def grow_class
        grow ? "grow" : nil
      end

      def shrink_class
        shrink ? "shrink" : nil
      end
    end
  end
end
