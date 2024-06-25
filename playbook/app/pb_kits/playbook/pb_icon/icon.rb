# frozen_string_literal: true

# rubocop:disable Style/HashLikeCase

require "open-uri"
require "json"

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
      prop :font_style, type: Playbook::Props::Enum,
                        values: %w[far fas fab fak],
                        default: "far"
      prop :spin, type: Playbook::Props::Boolean,
                  default: false

      ALIASES = JSON.parse(File.read(Playbook::Engine.root.join("app/pb_kits/playbook/pb_icon/icon_aliases.json")))

      def valid_emoji?
        emoji_regex = /\p{Emoji}/
        emoji_regex.match?(icon)
      end

      def classname
        generate_classname(
          "pb_icon_kit",
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
        svg["class"] = %w[pb_custom_icon svg-inline--fa].concat([object.custom_icon_classname]).join(" ")
        svg["id"] = object.id
        svg["data"] = object.data
        svg["aria"] = object.aria
        svg["height"] = "auto"
        svg["width"] = "auto"
        doc.at_css("path")["fill"] = "currentColor"
        raw doc
      end

      def is_svg?
        (icon || custom_icon.to_s).include?(".svg") || asset_path.present?
      end

    private

      def resolve_alias(icon)
        aliases = ALIASES[icon]
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

      def font_style_class
        font_style ? font_style.to_s : "far"
      end

      def spin_class
        spin ? "fa-spin" : nil
      end
    end
  end
end

# rubocop:enable Style/HashLikeCase
