# frozen_string_literal: true

require "open-uri"
require "json"

module Playbook
  module PbIcon
    class Icon < Playbook::KitBase
      prop :border, type: Playbook::Props::Boolean,
                    default: false
      prop :fixed_width, type: Playbook::Props::Boolean,
                         default: true
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
      prop :font_style, type: Playbook::Props::Enum,
                        values: %w[far fas fab fak],
                        default: "far"
      prop :spin, type: Playbook::Props::Boolean,
                  default: false
      prop :color, type: Playbook::Props::String
      prop :tabindex

      def valid_emoji?
        emoji_regex = /\p{Emoji}/
        emoji_regex.match?(icon)
      end

      def classname
        generate_classname(
          "pb_icon_kit",
          color_class,
          font_style_class,
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
          color_class,
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

      def icon_alias_map
        return unless Rails.application.config.respond_to?(:icon_alias_path)

        base_path = Rails.application.config.icon_alias_path
        json = File.read(Rails.root.join(base_path))
        JSON.parse(json)["aliases"].freeze
      end

      def asset_path
        return unless Rails.application.config.respond_to?(:icon_path)

        base_path = Rails.application.config.icon_path
        resolved_icon = resolve_alias(icon)
        icon_path = Dir.glob(Rails.root.join(base_path, "**", "#{resolved_icon}.svg")).first
        icon_path if icon_path && File.exist?(icon_path)
      end

      def render_svg
        doc = Nokogiri::XML(URI.open(asset_path || icon || custom_icon)) # rubocop:disable Security/Open
        svg = doc.at_css "svg"

        unless svg
          return "" # Return an empty string if SVG element is not found
        end

        svg["class"] = %w[pb_custom_icon svg-inline--fa].concat([object.custom_icon_classname]).join(" ")
        svg["id"] = object.id
        svg["height"] = "auto"
        svg["width"] = "auto"
        svg["tabindex"] = object.tabindex
        fill_color = object.color || "currentColor"
        doc.at_css("path")["fill"] = fill_color

        if object.data.present?
          object.data.each do |key, value|
            svg["data-#{key}"] = value
          end
        end

        if object.aria.present?
          object.aria.each do |key, value|
            k = key.to_s
            attr = k.start_with?("aria-") ? k : "aria-#{k.tr('_', '-')}"
            svg[attr] = value
          end
        end

        raw doc
      rescue OpenURI::HTTPError, StandardError
        # Handle any exceptions and return an empty string
        ""
      end

      def is_svg?
        (icon || custom_icon.to_s).include?(".svg") || asset_path.present?
      end

    private

      def resolve_alias(icon)
        return icon unless icon_alias_map

        aliases = icon_alias_map[icon]
        return icon unless aliases

        if aliases.is_a?(Array)
          aliases.find { |alias_name| file_exists?(alias_name) } || icon
        else
          aliases
        end
      end

      def file_exists?(alias_name)
        base_path = Rails.application.config.icon_path
        File.exist?(Dir.glob(Rails.root.join(base_path, "**", "#{alias_name}.svg")).first)
      end

      def svg_size
        size.nil? ? "1x" : size
      end

      def border_class
        prefix = is_svg? ? "svg_border" : "fa-border"
        border ? prefix : nil
      end

      def fixed_width_class
        prefix = is_svg? ? "svg_fw" : "fa-fw"
        fixed_width ? prefix : nil
      end

      def icon_class
        icon ? "fa-#{icon}" : nil
      end

      def inverse_class
        class_name = is_svg? ? "svg_inverse" : "fa-inverse"
        inverse ? class_name : nil
      end

      def list_item_class
        class_name = is_svg? ? "svg_li" : "fa-li"
        list_item ? class_name : nil
      end

      def flip_class
        prefix = is_svg? ? "flip_" : "fa-flip-"
        case flip
        when "horizontal"
          "#{prefix}horizontal"
        when "vertical"
          "#{prefix}vertical"
        when "both"
          "#{prefix}horizontal #{prefix}vertical"
        end
      end

      def pull_class
        class_name = is_svg? ? "pull_#{pull}" : "fa-pull-#{pull}"
        pull ? class_name : nil
      end

      def pulse_class
        class_name = is_svg? ? "pulse" : "fa-pulse"
        pulse ? class_name : nil
      end

      def rotation_class
        class_name = is_svg? ? "rotate_#{rotation}" : "fa-rotate-#{rotation}"
        rotation ? class_name : nil
      end

      def size_class
        class_name = is_svg? ? "svg_#{size}" : "fa-#{size}"
        size ? class_name : nil
      end

      def font_style_class
        font_style ? font_style.to_s : "far"
      end

      def spin_class
        class_name = is_svg? ? "spin" : "fa-spin"
        spin ? class_name : nil
      end

      def color_class
        color ? "color_#{color}" : nil
      end
    end
  end
end
