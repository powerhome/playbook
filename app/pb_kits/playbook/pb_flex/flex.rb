# frozen_string_literal: true

module Playbook
  module PbFlex
    class Flex
      include Playbook::Props

      partial "pb_flex/flex"

      prop :horizontal, type: Playbook::Props::Enum,
                        values: %w[left center right stretch],
                        default: "left"

      prop :inline, type: Playbook::Props::Boolean,
                    default: false

      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[row column],
                         default: "row"

      prop :spacing, type: Playbook::Props::Enum,
                     values: %w[around between evenly none],
                     default: "none"

      prop :reverse, type: Playbook::Props::Boolean,
                     default: false

      prop :vertical, type: Playbook::Props::Enum,
                      values: %w[top center bottom stretch],
                      default: "top"

      prop :wrap, type: Playbook::Props::Boolean,
                  default: false

      def classname
        generate_classname("pb_flex_kit",
                           orientation_class,
                           horizontal_class,
                           vertical_class,
                           inline_class,
                           wrap_class,
                           spacing_class)
      end

    private

      def orientation_class
        "orientation_#{orientation}#{reverse_class}"
      end

      def horizontal_class
        if orientation == "row"
          "justify_content_#{horizontal}#{reverse_class}"
        else
          "align_items_#{horizontal}"
        end
      end

      def inline_class
        inline ? "inline" : nil
      end

      def spacing_class
        "spacing_#{spacing}"
      end

      def reverse_class
        reverse ? "_reverse" : nil
      end

      def vertical_class
        if orientation == "row"
          "align_items_#{vertical}"
        else
          "justify_content_#{vertical}_#{reverse_class}"
        end
      end

      def wrap_class
        wrap ? "wrap" : nil
      end
    end
  end
end
