# frozen_string_literal: true

require "open-uri"
require "json"
require "digest"

module Playbook
  module PbIcon
    class Icon < Playbook::KitBase
      ICON_PATH_DEV_CACHE_TTL_SECONDS = 2
      ICON_PATH_PROD_CACHE_TTL_SECONDS = 60

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

      # Instance-level memoization of alias map lookup result
      def icon_alias_map
        return @icon_alias_map if defined?(@icon_alias_map)

        @icon_alias_map = self.class.icon_alias_map
      end

      # Instance-level memoization of resolved asset path
      def asset_path
        return @asset_path if defined?(@asset_path)

        @asset_path =
          if Rails.application.config.respond_to?(:icon_path)
            resolved_icon = resolve_alias(icon)
            path = self.class.icon_path_index[resolved_icon]
            path if path && File.exist?(path)
          end
      end

      def is_svg?
        return @is_svg if defined?(@is_svg)

        @is_svg = (icon || custom_icon.to_s).include?(".svg") || asset_path.present?
      end

      def render_svg
        doc = Nokogiri::XML(URI.open(asset_path || icon || custom_icon)) # rubocop:disable Security/Open
        svg = doc.at_css("svg")
        return "" unless svg

        svg["class"] = %w[pb_custom_icon svg-inline--fa].concat([object.custom_icon_classname]).join(" ")
        svg["id"] = object.id
        svg["height"] = "auto"
        svg["width"] = "auto"
        svg["tabindex"] = object.tabindex
        fill_color = object.color || "currentColor"

        # Safely apply fill to all paths (avoids nil errors + handles multi-path icons)
        doc.css("path").each { |p| p["fill"] = fill_color }

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

      # Class-level caches
      class << self
        @cache_mutex = Mutex.new

        # Cache aliases.json across the process, but invalidate when the file changes (dev-safe)
        def icon_alias_map
          return @icon_alias_map if alias_cache_fresh?

          cache_mutex.synchronize do
            return @icon_alias_map if alias_cache_fresh?

            @icon_alias_map =
              if Rails.application.config.respond_to?(:icon_alias_path)
                base_path = Rails.application.config.icon_alias_path
                full_path = Rails.root.join(base_path)
                @icon_alias_map_mtime = safe_mtime(full_path)

                json = File.read(full_path)
                parsed = JSON.parse(json)
                parsed.fetch("aliases", {}).freeze
              end
          end

          @icon_alias_map
        end

        # Cache an index of icon_name to file path for all SVGs in the configured directory, with invalidation based on directory mtime
        # Avoids recursive Dir.glob for every icon render
        def icon_path_index
          return @icon_path_index if index_cache_fresh?

          cache_mutex.synchronize do
            return @icon_path_index if index_cache_fresh?

            @icon_path_index =
              if Rails.application.config.respond_to?(:icon_path)
                base_path = Rails.application.config.icon_path
                root = Rails.root.join(base_path)

                # If path doesn't exist, keep behavior aligned (no path resolution)
                if Dir.exist?(root)
                  @icon_path_index_cache_key = icon_path_cache_key(root)

                  # One scan builds the map for O(1) lookups
                  # Key is the filename (without .svg) to match existing usage
                  index = {}
                  Dir.glob(File.join(root.to_s, "**", "*.svg")).sort.each do |p|
                    name = File.basename(p, ".svg")
                    index[name] ||= p
                  end
                  index.freeze
                else
                  @icon_path_index_cache_key = nil
                  {}
                end
              else
                {}
              end

            @icon_path_index_checked_at = monotonic_now
          end

          @icon_path_index
        end

      private

        def cache_mutex
          @cache_mutex ||= Mutex.new
        end

        def alias_cache_fresh?
          return false unless defined?(@icon_alias_map)

          return true unless Rails.application.config.respond_to?(:icon_alias_path)

          full_path = Rails.root.join(Rails.application.config.icon_alias_path)
          safe_mtime(full_path) == @icon_alias_map_mtime
        rescue
          false
        end

        def index_cache_fresh?
          return false unless defined?(@icon_path_index)

          return true unless Rails.application.config.respond_to?(:icon_path)

          # In development and production, skip re-checks for a short TTL window
          # to avoid repeated tree scans on hot paths.
          return true if Rails.env.development? && within_icon_index_ttl?(ICON_PATH_DEV_CACHE_TTL_SECONDS)
          return true if Rails.env.production? && within_icon_index_ttl?(ICON_PATH_PROD_CACHE_TTL_SECONDS)

          root = Rails.root.join(Rails.application.config.icon_path)
          fresh = icon_path_cache_key(root) == @icon_path_index_cache_key
          @icon_path_index_checked_at = monotonic_now
          fresh
        rescue
          false
        end

        def within_icon_index_ttl?(ttl_seconds)
          return false unless defined?(@icon_path_index_checked_at)

          (monotonic_now - @icon_path_index_checked_at) < ttl_seconds
        rescue
          false
        end

        def monotonic_now
          Process.clock_gettime(Process::CLOCK_MONOTONIC)
        end

        def icon_path_cache_key(root)
          return safe_mtime(root) unless Rails.env.development? || Rails.env.production?

          digest = Digest::SHA1.new
          root_prefix = "#{root}/"

          Dir.glob(File.join(root.to_s, "**", "*.svg")).sort.each do |path|
            digest << path.delete_prefix(root_prefix)
            next unless Rails.env.development?

            # Development tracks file metadata for rapid local edits.
            # Production only needs path-set change detection during periodic checks.
            stat = File.stat(path)
            digest << stat.mtime.to_f.to_s
            digest << stat.size.to_s
          end

          digest.hexdigest
        rescue
          nil
        end

        def safe_mtime(path)
          File.exist?(path) ? File.mtime(path) : nil
        rescue
          nil
        end
      end

    private

      def resolve_alias(icon)
        return icon unless icon_alias_map
        return icon if icon.nil?

        aliases = icon_alias_map[icon]
        return icon unless aliases

        if aliases.is_a?(Array)
          aliases.find { |alias_name| file_exists?(alias_name) } || icon
        else
          aliases
        end
      end

      def file_exists?(alias_name)
        # Use the cached index (no recursive glob)
        self.class.icon_path_index.key?(alias_name)
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
