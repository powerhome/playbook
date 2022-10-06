# frozen_string_literal: true

# rubocop:disable Style/StringConcatenation, Style/HashLikeCase

require "open-uri"

module Playbook
  module PbIcon
    class Icon < Playbook::KitBase
      prop :border, type: Playbook::Props::Boolean,
                    default: false
      prop :fixed_width, type: Playbook::Props::Boolean,
                         default: false
      prop :flip, type: Playbook::Props::Enum,
                  values: ["horizontal", "vertical", "both", nil],
                  default: nil
      prop :icon
      prop :custom_icon, type: Playbook::Props::String,
                         default: nil
      prop :inverse, type: Playbook::Props::Boolean,
                     default: false
      prop :list_item, type: Playbook::Props::Boolean,
                       default: false
      prop :pull, type: Playbook::Props::Enum,
                  values: ["left", "right", nil],
                  default: nil
      prop :pulse, type: Playbook::Props::Boolean,
                   default: false
      prop :rotation, type: Playbook::Props::Enum,
                      values: [90, 180, 270, nil],
                      default: nil
      prop :size, type: Playbook::Props::Enum,
                  values: ["lg", "xs", "sm", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x", nil],
                  default: nil
      prop :style, type: Playbook::Props::Enum,
                   values: %w[far fas fab],
                   default: "far"
      prop :spin, type: Playbook::Props::Boolean,
                  default: false

      def classname
        generate_classname(
          "pb_icon_kit",
          style_class,
          icon_class,
          border_class,
          fixed_width_class,
          flip_class,
          inverse_class,
          list_item_class,
          pull_class,
          pulse_class,
          rotation_class,
          size_class,
          spin_class,
          separator: " "
        )
      end

      def custom_icon_classname
        generate_classname(
          "pb_icon_kit",
          border_class,
          fixed_width_class,
          flip_class,
          inverse_class,
          list_item_class,
          pull_class,
          pulse_class,
          rotation_class,
          size_class,
          spin_class,
          separator: " "
        )
      end

      def render_svg(path)
        if File.extname(path) == ".svg"
          doc = Nokogiri::XML(URI.open(path)) # rubocop:disable Security/Open
          svg = doc.at_css "svg"
          svg["class"] = "pb_custom_icon " + object.custom_icon_classname
          raw doc
        else
          raise("Custom icon must be an svg. Please check your path and file type.")
        end
      end

    private

      def border_class
        border ? "fa-border" : nil
      end

      def fixed_width_class
        fixed_width ? "fa-fw" : nil
      end

      def icon_class
        icon ? "fa-#{icon}" : nil
      end

      def inverse_class
        inverse ? "fa-inverse" : nil
      end

      def list_item_class
        list_item ? "fa-li" : nil
      end

      def flip_class
        case flip
        when "horizontal"
          "fa-flip-horizontal"
        when "vertical"
          "fa-flip-vertical"
        when "both"
          "fa-flip-horizontal fa-flip-vertical"
        end
      end

      def pull_class
        pull ? "fa-pull-#{pull}" : nil
      end

      def pulse_class
        pulse ? "fa-pulse" : nil
      end

      def rotation_class
        rotation ? "fa-rotate-#{rotation}" : nil
      end

      def size_class
        size ? "fa-#{size}" : nil
      end

      def style_class
        style ? style.to_s : "far"
      end

      def spin_class
        spin ? "fa-spin" : nil
      end
    end
  end
end

# rubocop:enable Style/StringConcatenation, Style/HashLikeCase
