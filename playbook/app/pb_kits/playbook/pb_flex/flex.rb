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

      prop :gap

      prop :row_gap

      prop :column_gap

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
        generate_classname("pb_flex_kit",
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
                           align_self_class)
      end

    private

      def orientation_class
        "orientation_#{orientation}"
      end

      def horizontal_class
        if orientation == "row"
          "justify_content_#{horizontal}"
        elsif align == "none"
          "align_items_#{horizontal}"
        end
      end

      def justify_class
        if justify == "none"
          horizontal_class
        else
          "justify_content_#{justify}"
        end
      end

      def inline_class
        inline ? "inline" : nil
      end

      def spacing_class
        "spacing_#{spacing}"
      end

      def reverse_class
        reverse ? "reverse" : nil
      end

      def vertical_class
        if orientation == "row"
          "align_items_#{vertical}"
        elsif justify == "none"
          "justify_content_#{vertical}"
        end
      end

      def align_class
        if align == "none"
          vertical_class
        else
          "align_items_#{align}"
        end
      end

      def align_self_class
        if align_self == "none"
          nil
        else
          "align_self_#{align_self}"
        end
      end

      def wrap_class
        wrap ? "wrap" : nil
      end

      def gap_class
        if gap == "none" || gap.nil? || gap.is_a?(Hash)
          nil
        else
          "gap_#{gap}"
        end
      end

      def row_gap_class
        if row_gap == "none" || row_gap.nil? || row_gap.is_a?(Hash)
          nil
        else
          "rowGap_#{row_gap}"
        end
      end

      def column_gap_class
        if column_gap == "none" || column_gap.nil? || column_gap.is_a?(Hash)
          nil
        else
          "columnGap_#{column_gap}"
        end
      end
    end
  end
end
