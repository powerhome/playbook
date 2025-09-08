# frozen_string_literal: true

module Playbook
  module PbOverlay
    class Overlay < Playbook::KitBase
      prop :color, type: Playbook::Props::Enum,
                   values: %w[card_light bg_light card_dark bg_dark],
                   default: "card_light"
      prop :layout, type: Playbook::Props::HashProp,
                    default: { "bottom": "full" }
      prop :dynamic, type: Playbook::Props::Boolean,
                     default: false
      prop :scroll_bar_none, type: Playbook::Props::Boolean,
                             default: false

      def classname
        generate_classname("pb_overlay", hide_scroll_bar_class, separator: " ")
      end

      def position
        layout.keys[0]
      end

      def size
        layout.values[0]
      end

      def is_size_percentage
        size.include?("%")
      end

      def previous_overlay
        "linear-gradient(#{previous_overlay_direction}, #{color_map[color.to_sym]} 0%, transparent #{size})"
      end

      def subsequent_overlay
        "linear-gradient(#{subsequent_overlay_direction}, #{color_map[color.to_sym]} 0%, transparent #{size})"
      end

      def previous_overlay_class_name
        "overlay_#{color}_#{previous_overlay_direction_token}_#{size}"
      end

      def subsequent_overlay_class_name
        "overlay_#{color}_#{subsequent_overlay_direction_token}_#{size}"
      end

      def previous_overlay_direction
        previous_overlay_direction_map[position.to_sym]
      end

      def subsequent_overlay_direction
        subsequent_overlay_direction_map[position.to_sym]
      end

      def previous_overlay_direction_token
        has_subsequent_overlay ? previous_overlay_direction_map_token[position.to_sym] : position
      end

      def subsequent_overlay_direction_token
        has_subsequent_overlay ? subsequent_overlay_direction_map_token[position.to_sym] : position
      end

      def previous_overlay_direction_map
        {
          "bottom": "to top",
          "top": "to bottom",
          "left": "to right",
          "right": "to left",
          "x": "to right",
          "y": "to top",
        }
      end

      def subsequent_overlay_direction_map
        {
          "bottom": "to top",
          "top": "to bottom",
          "left": "to right",
          "right": "to left",
          "x": "to left",
          "y": "to bottom",
        }
      end

      def previous_overlay_direction_map_token
        {
          "x": "left",
          "y": "top",
        }
      end

      def subsequent_overlay_direction_map_token
        {
          "x": "right",
          "y": "bottom",
        }
      end

      def has_subsequent_overlay
        position == "x".to_sym || position == "y".to_sym
      end

      def color_map
        {
          "card_light": "#fff",
          "bg_light": "#F3F7FB",
          "card_dark": "#231E3D",
          "bg_dark": "#0a0527",
        }
      end

      def data_attributes
        data ||= {}
        data.merge!("data-pb-overlay" => true)
        data.merge!("data-overlay-dynamic" => true) if dynamic
        data
      end

      def hide_scroll_bar_class
        scroll_bar_none ? " overlay-hide-scrollbar" : ""
      end
    end
  end
end
