# frozen_string_literal: true

module Playbook
  module PbLegend
    class Legend < Playbook::KitBase
      prop :color, type: Playbook::Props::String,
                   default: "data_1"
      prop :prefix_text
      prop :text, required: true

      def body_color
        dark ? "lighter" : "light"
      end

      def custom_color
        color.start_with?("#") ? "background: #{color}" : ""
      end

      def custom_color_class
        color.start_with?("#") ? "pb_legend_indicator_circle_custom" : "pb_legend_indicator_circle"
      end

      def classname
        generate_classname("pb_legend_kit", color.start_with?("#") ? nil : color)
      end
    end
  end
end
