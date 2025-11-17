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

      # Returns the filesystem path to the icon file (for backward compatibility)
      def asset_path
        return unless Rails.application.config.respond_to?(:icon_path)

        base_path = Rails.application.config.icon_path
        resolved_icon = resolve_alias(icon)
        icon_path = Dir.glob(Rails.root.join(base_path, "**", "#{resolved_icon}.svg")).first
        icon_path if icon_path && File.exist?(icon_path)
      end

      # Returns the relative path from the images directory for use with asset helpers
      # Note: In development, icons are in node_modules and can't be served via vite_asset_path
      # (they're not in the Vite manifest). Icons will fall back to inline SVG in development.
      # In production, icons are copied to app/javascript/images/ and can be served as static assets.
      def icon_relative_path
        return nil unless Rails.application.config.respond_to?(:icon_path)

        base_path = Rails.application.config.icon_path
        resolved_icon = resolve_alias(icon)
        return nil unless resolved_icon

        # First, check if icon exists in app/javascript/images/ (production or if copied in dev)
        production_path = Rails.root.join("app/javascript/images", "**", "#{resolved_icon}.svg")
        production_icon = Dir.glob(production_path).first
        if production_icon && File.exist?(production_icon)
          relative_path = Pathname.new(production_icon).relative_path_from(Rails.root).to_s
          return relative_path.sub("app/javascript/", "") if relative_path.start_with?("app/javascript/images/")
        end

        # Find the icon file using the configured base_path
        icon_path = Dir.glob(Rails.root.join(base_path, "**", "#{resolved_icon}.svg")).first
        return nil unless icon_path && File.exist?(icon_path)

        # Get the relative path from Rails.root
        relative_path = Pathname.new(icon_path).relative_path_from(Rails.root).to_s

        # Convert to vite asset path format (images/...)
        # In production: app/javascript/images/... -> images/...
        if relative_path.start_with?("app/javascript/images/")
          relative_path.sub("app/javascript/", "")
        elsif relative_path.include?("node_modules/")
          # In development, icons in node_modules can't be served via vite_asset_path
          # (not in Vite manifest). Return nil to trigger inline SVG fallback.
          nil
        else
          # Fallback: try to construct a reasonable path
          "images/#{File.basename(icon_path)}"
        end
      end

      # Returns the asset URL for the icon (cached, served as static asset)
      def icon_asset_url
        # First try to get relative path for vite_asset_path
        if icon_relative_path
          # Try to use vite_asset_path if available (ViteRails)
          # ViewComponent has access to helpers through view_context
          helper_context = respond_to?(:view_context) ? view_context : self

          if helper_context.respond_to?(:vite_asset_path)
            return helper_context.vite_asset_path(icon_relative_path)
          elsif respond_to?(:helpers) && helpers.respond_to?(:vite_asset_path)
            return helpers.vite_asset_path(icon_relative_path)
          elsif respond_to?(:asset_path)
            # Fallback to Rails asset_path if Vite is not available
            return asset_path(icon_relative_path)
          end
        end

        # If icon_relative_path is nil (e.g., in development with node_modules),
        # try to construct a direct path that Vite dev server can serve
        # For now, return nil to fall back to inline in development
        nil
      rescue
        # If asset helper fails, return nil to fall back to inline rendering
        nil
      end

      # Renders SVG inline (used when color customization is needed or asset URL unavailable)
      def render_svg
        doc = Nokogiri::XML(URI.open(asset_path || icon || custom_icon)) # rubocop:disable Security/Open
        svg = doc.at_css "svg"

        unless svg
          return "" # Return an empty string if SVG element is not found
        end

        svg["class"] = %w[pb_custom_icon svg-inline--fa].concat([object.custom_icon_classname]).join(" ")
        svg["id"] = object.id
        svg["data"] = object.data
        svg["height"] = "auto"
        svg["width"] = "auto"
        svg["tabindex"] = object.tabindex
        fill_color = object.color || "currentColor"
        doc.at_css("path")["fill"] = fill_color

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

      # Determines if we should use static asset (img tag) or inline SVG
      # Use inline SVG when:
      # - Color customization is needed (can't change fill on img tag)
      # - Custom icon URL is provided
      # - Asset URL is not available (e.g., in development with node_modules)
      # - Icon is in node_modules (development mode - can't be served as static asset)
      def should_inline_svg?
        return true if custom_icon.present?
        return true if icon_asset_url.nil?
        return true if color.present? # Need to modify fill color
        return true if asset_path&.include?("node_modules/") # Development mode

        false
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
