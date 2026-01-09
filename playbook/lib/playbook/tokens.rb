# frozen_string_literal: true

module Playbook
  # Playbook Design Tokens for Rails
  #
  # This module provides access to Playbook's design tokens (colors, typography, etc.)
  # from Ruby/Rails code, mirroring what's available in React via the tokens.js exports.
  #
  # Usage:
  #   Playbook::Tokens::Colors.data_1  # => "#0056CF"
  #   Playbook::Tokens::Colors::DATA_1 # => "#0056CF"
  #   Playbook::Tokens::Colors[:data_1] # => "#0056CF"
  #   Playbook::Tokens::Colors.all     # => { data_1: "#0056CF", ... }
  #
  module Tokens
    # Color tokens matching _colors.scss definitions
    #
    # Source of truth: app/pb_kits/playbook/tokens/_colors.scss
    #
    module Colors
      # Base colors
      ROYAL = "#0056CF"
      PURPLE = "#9E64E9"
      TEAL = "#00C4D7"
      RED = "#DA0014"
      RED_DARK = "#ff4a50"
      YELLOW = "#F9BB00"
      GREEN = "#1CA05C"
      ORANGE = "#FD804C"
      DEFAULT = "#93a8b8"

      # Interface colors
      WHITE = "#FFFFFF"
      SILVER = "#F3F7FB"
      SLATE = "#C1CDD6"
      CHARCOAL = "#242B42"
      BLACK = "#000000"

      # Main colors
      PRIMARY = ROYAL
      SECONDARY = YELLOW
      TERTIARY = PURPLE

      # Background colors
      BG_LIGHT = SILVER
      BG_DARK = "#0a0527"
      BG_DARK_CARD = "#231E3D"

      # Card colors
      CARD_LIGHT = WHITE
      CARD_DARK = "#1a0f3b" # mix(white, $bg_dark, 10%)

      # Active colors
      ACTIVE_LIGHT = "#ebf4ff" # lighten(#E5F2FF, 3.5%)
      ACTIVE_DARK = "#0082ff"

      # Border colors
      BORDER_LIGHT = "#E4E8F0"
      BORDER_DARK = "#241f46" # mix(white, $bg_dark, 20%)

      # Text colors - Light theme
      TEXT_LT_DEFAULT = CHARCOAL
      TEXT_LT_LIGHT = "#687887"
      TEXT_LT_LIGHTER = SLATE
      TEXT_LT_SUCCESS_SM = "#157F48"

      # Text colors - Dark theme
      TEXT_DK_DEFAULT = WHITE
      TEXT_DK_LIGHT = "rgba(255, 255, 255, 0.6)"
      TEXT_DK_LIGHTER = "rgba(255, 255, 255, 0.4)"
      TEXT_DK_SUCCESS_SM = "#00CA74"

      # Data colors (for charts, graphs, data visualization)
      DATA_1 = ROYAL
      DATA_2 = YELLOW
      DATA_3 = PURPLE
      DATA_4 = GREEN
      DATA_5 = ORANGE
      DATA_6 = "#144075"
      DATA_7 = TEAL
      DATA_8 = RED

      # Status colors
      SUCCESS = GREEN
      SUCCESS_SECONDARY = "#3ab876" # lighten($success, 10%)
      SUCCESS_SM = TEXT_LT_SUCCESS_SM
      WARNING = YELLOW
      WARNING_SECONDARY = "#fac73a" # lighten($warning, 10%)
      ERROR = RED
      ERROR_DARK = RED_DARK
      ERROR_SECONDARY = "#e23348" # lighten($error, 10%)
      INFO = TEAL
      INFO_SECONDARY = "#33d4e4" # lighten($info, 10%)
      NEUTRAL = SLATE
      NEUTRAL_SECONDARY = "#d4dde3" # lighten($neutral, 10%)

      # Product colors
      PRODUCT_1_BACKGROUND = "#003DB2"
      PRODUCT_1_HIGHLIGHT = "#0057FF"
      PRODUCT_2_BACKGROUND = "#6000AC"
      PRODUCT_2_HIGHLIGHT = "#8200E9"
      PRODUCT_3_BACKGROUND = "#B85C00"
      PRODUCT_3_HIGHLIGHT = "#CE7500"
      PRODUCT_4_BACKGROUND = "#007E8F"
      PRODUCT_4_HIGHLIGHT = "#00B9D2"
      PRODUCT_5_BACKGROUND = "#760B24"
      PRODUCT_5_HIGHLIGHT = "#B8032E"
      PRODUCT_6_BACKGROUND = "#008540"
      PRODUCT_6_HIGHLIGHT = "#00A851"
      PRODUCT_7_BACKGROUND = "#96006C"
      PRODUCT_7_HIGHLIGHT = "#CD0094"
      PRODUCT_8_BACKGROUND = "#144075"
      PRODUCT_8_HIGHLIGHT = "#1A569E"
      PRODUCT_9_BACKGROUND = "#fcc419"
      PRODUCT_9_HIGHLIGHT = "#ffd43b"
      PRODUCT_10_BACKGROUND = "#20c997"
      PRODUCT_10_HIGHLIGHT = "#38d9a9"

      # Category colors
      CATEGORY_1 = ROYAL
      CATEGORY_2 = "#0CD2E5"
      CATEGORY_3 = YELLOW
      CATEGORY_4 = "#14D595"
      CATEGORY_5 = "#A057FF"
      CATEGORY_6 = "#FF7034"
      CATEGORY_7 = "#97DA22"
      CATEGORY_8 = "#EA599F"
      CATEGORY_9 = "#0091FF"
      CATEGORY_10 = "#5027E4"
      CATEGORY_11 = RED
      CATEGORY_12 = "#109922"
      CATEGORY_13 = "#058F9D"
      CATEGORY_14 = "#A33E6F"
      CATEGORY_15 = "#B2171C"
      CATEGORY_16 = "#0A5C49"
      CATEGORY_17 = "#325B91"
      CATEGORY_18 = "#BE4714"
      CATEGORY_19 = "#000080"
      CATEGORY_20 = "#5C0E0A"
      CATEGORY_21 = "#040830"

      # Gradient colors
      GRADIENT_START = "#1C75F2"
      GRADIENT_END = ROYAL

      class << self
        # Access color by symbol key
        # @example
        #   Playbook::Tokens::Colors[:data_1] # => "#0056CF"
        #
        def [](key)
          all[key.to_sym]
        end

        # Returns all colors as a hash with symbol keys and snake_case names
        # @example
        #   Playbook::Tokens::Colors.all # => { royal: "#0056CF", ... }
        #
        def all
          @all ||= constants(false)
                   .reject { |c| c == :DEPRECATED }
                   .each_with_object({}) do |const_name, hash|
            hash[const_name.to_s.downcase.to_sym] = const_get(const_name)
          end.freeze
        end

        # Returns data colors as an ordered array (useful for charts)
        # @example
        #   Playbook::Tokens::Colors.data_colors
        #   # => ["#0056CF", "#F9BB00", "#9E64E9", ...]
        #
        def data_colors
          @data_colors ||= [
            DATA_1, DATA_2, DATA_3, DATA_4,
            DATA_5, DATA_6, DATA_7, DATA_8
          ].freeze
        end

        # Returns status colors as a hash
        # @example
        #   Playbook::Tokens::Colors.status_colors
        #   # => { success: "#1CA05C", warning: "#F9BB00", ... }
        #
        def status_colors
          @status_colors ||= {
            success: SUCCESS,
            success_secondary: SUCCESS_SECONDARY,
            warning: WARNING,
            warning_secondary: WARNING_SECONDARY,
            error: ERROR,
            error_secondary: ERROR_SECONDARY,
            info: INFO,
            info_secondary: INFO_SECONDARY,
            neutral: NEUTRAL,
            neutral_secondary: NEUTRAL_SECONDARY,
          }.freeze
        end

        # Returns category colors as an ordered array
        # @example
        #   Playbook::Tokens::Colors.category_colors
        #   # => ["#0056CF", "#0CD2E5", ...]
        #
        def category_colors
          @category_colors ||= [
            CATEGORY_1, CATEGORY_2, CATEGORY_3, CATEGORY_4, CATEGORY_5,
            CATEGORY_6, CATEGORY_7, CATEGORY_8, CATEGORY_9, CATEGORY_10,
            CATEGORY_11, CATEGORY_12, CATEGORY_13, CATEGORY_14, CATEGORY_15,
            CATEGORY_16, CATEGORY_17, CATEGORY_18, CATEGORY_19, CATEGORY_20,
            CATEGORY_21
          ].freeze
        end

        # Returns product colors as a hash
        def product_colors
          @product_colors ||= (1..10).each_with_object({}) do |i, hash|
            hash[:"product_#{i}_background"] = const_get(:"PRODUCT_#{i}_BACKGROUND")
            hash[:"product_#{i}_highlight"] = const_get(:"PRODUCT_#{i}_HIGHLIGHT")
          end.freeze
        end

        # Dynamic method access for color tokens
        # @example
        #   Playbook::Tokens::Colors.data_1 # => "#0056CF"
        #   Playbook::Tokens::Colors.royal  # => "#0056CF"
        #
        def method_missing(method_name, *args, &block)
          const_name = method_name.to_s.upcase
          if const_defined?(const_name, false)
            const_get(const_name)
          else
            super
          end
        end

        def respond_to_missing?(method_name, include_private = false)
          const_defined?(method_name.to_s.upcase, false) || super
        end
      end
    end
  end
end
