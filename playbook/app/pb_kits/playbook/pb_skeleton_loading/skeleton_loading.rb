# frozen_string_literal: true

module Playbook
  module PbSkeletonLoading
    class SkeletonLoading < Playbook::KitBase
      prop :height, type: Playbook::Props::String,
                    default: "16px"
      prop :width, type: Playbook::Props::String,
                   default: "100%"
      prop :border_radius, type: Playbook::Props::Enum,
                           values: %w[none xs sm md lg xl rounded],
                           default: "sm"
      prop :gap, type: Playbook::Props::Enum,
                 values: %w[none xxs xs sm md lg xl xxl],
                 default: "xxs"
      prop :stack, type: Playbook::Props::Number,
                   default: 1
      prop :color, type: Playbook::Props::Enum,
                   values: %w[default white],
                   default: "default"
      prop :dark, type: Playbook::Props::Boolean,
                  default: false

      def classname
        generate_classname("pb_skeleton_loading")
      end

      def item_classname(index = nil)
        classes = [
          "pb_skeleton_loading_item",
          "border_radius_#{border_radius}",
          "color_#{color}",
          ("dark" if dark),
          gap_class(index),
        ]
        classes.compact.join(" ")
      end

      def item_inline_styles
        styles = []
        styles << "height: #{height}"
        styles << "width: #{width}"
        styles << "border: 1px solid red"
        styles.join("; ")
      end

      def gap_class(index = nil)
        stack > 1 && index.to_i.positive? && gap != "none" ? "gap_#{gap}" : nil
      end
    end
  end
end
