# frozen_string_literal: true

module Playbook
  module Spacing
    def self.included(base)
      base.prop :gap
      base.prop :column_gap
      base.prop :row_gap
      base.prop :margin
      base.prop :margin_bottom
      base.prop :margin_left
      base.prop :margin_right
      base.prop :margin_top
      base.prop :margin_x
      base.prop :margin_y
      base.prop :max_width
      base.prop :min_width
      base.prop :width
      base.prop :padding
      base.prop :padding_bottom
      base.prop :padding_left
      base.prop :padding_right
      base.prop :padding_top
      base.prop :padding_x
      base.prop :padding_y
    end

    MAX_WIDTH_VALUES = %w[0% xs sm md lg xl xxl 0 none 100%].freeze
    MIN_WIDTH_VALUES = %w[0% xs sm md lg xl xxl 0 none 100%].freeze
    WIDTH_VALUES = %w[0% xs sm md lg xl xxl 0 none 100%].freeze
    GAP_VALUES = %w[none xxs xs sm md lg xl].freeze
    SPACING_VALUES = %w[none xxs xs sm md lg xl auto initial inherit].freeze
    SCREEN_SIZE_VALUES = %w[xs sm md lg xl default].freeze
    BREAK_METHOD_VALUES = %w[on at].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze
    SPACING_HASH_SKIP_KEYS = %i[default break].freeze

    SPACING_PROP_MAP = {
      margin: "m",
      margin_bottom: "mb",
      margin_left: "ml",
      margin_right: "mr",
      margin_top: "mt",
      margin_x: "mx",
      margin_y: "my",
      padding: "p",
      padding_bottom: "pb",
      padding_left: "pl",
      padding_right: "pr",
      padding_top: "pt",
      padding_x: "px",
      padding_y: "py",
    }.freeze

    def max_width_options
      { max_width: "mw" }
    end

    def min_width_options
      { min_width: "minw" }
    end

    def width_options
      { width: "w" }
    end

    def max_width_values
      MAX_WIDTH_VALUES
    end

    def min_width_values
      MIN_WIDTH_VALUES
    end

    def width_values
      WIDTH_VALUES
    end

    def gap_values
      GAP_VALUES
    end

    def gap_options
      { gap: "gap" }
    end

    def column_gap_options
      { column_gap: "column_gap" }
    end

    def row_gap_options
      { row_gap: "row_gap" }
    end

    def spacing_options
      {
        margin: "m",
        margin_bottom: "mb",
        margin_left: "ml",
        margin_right: "mr",
        margin_top: "mt",
        margin_x: "mx",
        margin_y: "my",
        padding: "p",
        padding_bottom: "pb",
        padding_left: "pl",
        padding_right: "pr",
        padding_top: "pt",
        padding_x: "px",
        padding_y: "py",
      }
    end

    def spacing_values
      SPACING_VALUES
    end

    def screen_size_values
      SCREEN_SIZE_VALUES
    end

    def break_method_values
      BREAK_METHOD_VALUES
    end

    def spacing_props
      css = +""
      SPACING_PROP_MAP.each do |prop_name, prefix|
        spacing_value = values[prop_name]
        next unless spacing_value

        if spacing_value.is_a?(::Hash)
          default_value = spacing_value[:default]
          break_value = spacing_value[:break] || BREAK_METHOD_VALUES.first
          spacing_value.each do |key, value|
            next if SPACING_HASH_SKIP_KEYS.include?(key)

            css << "break_#{break_value}_#{key}\:#{prefix}_#{value} " if SCREEN_SIZE_VALUES.include?(key.to_s) && SPACING_VALUES.include?(value.to_s)
          end
          css << "#{prefix}_#{default_value} " if SPACING_VALUES.include?(default_value)
        elsif SPACING_VALUES.include?(spacing_value)
          css << "#{prefix}_#{spacing_value} "
        end
      end
      css.strip unless css.empty?
    end

    def filter_classname(value)
      if value.include?("%")
        value.gsub("%", "_percent")
      else
        value
      end
    end

    def min_width_props
      value = min_width
      return nil unless value

      "min_width_#{filter_classname(value)}" if MIN_WIDTH_VALUES.include?(value)
    end

    def max_width_props
      value = max_width
      return nil unless value

      "max_width_#{filter_classname(value)}" if MAX_WIDTH_VALUES.include?(value)
    end

    def width_props
      value = width
      return nil unless value

      "width_#{filter_classname(value)}" if WIDTH_VALUES.include?(value)
    end

    def gap_props
      value = gap
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "gap_#{value[:default].underscore} " if value.key?(:default) && GAP_VALUES.include?(value[:default].to_s)
        value.each do |media_size, gap_spacing_value|
          css << "gap_#{media_size}_#{gap_spacing_value.underscore} " if SCREEN_SIZES.include?(media_size.to_s) && GAP_VALUES.include?(gap_spacing_value.to_s)
        end
        css.strip unless css.empty?
      elsif GAP_VALUES.include?(value.to_s)
        "gap_#{value.underscore}"
      end
    end

    def column_gap_props
      value = column_gap
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "column_gap_#{value[:default].underscore} " if value.key?(:default) && GAP_VALUES.include?(value[:default].to_s)
        value.each do |media_size, column_gap_spacing_value|
          css << "column_gap_#{media_size}_#{column_gap_spacing_value.underscore} " if SCREEN_SIZES.include?(media_size.to_s) && GAP_VALUES.include?(column_gap_spacing_value.to_s)
        end
        css.strip unless css.empty?
      elsif GAP_VALUES.include?(value.to_s)
        "column_gap_#{value.underscore}"
      end
    end

    def row_gap_props
      value = row_gap
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "row_gap_#{value[:default].underscore} " if value.key?(:default) && GAP_VALUES.include?(value[:default].to_s)
        value.each do |media_size, row_gap_spacing_value|
          css << "row_gap_#{media_size}_#{row_gap_spacing_value.underscore} " if SCREEN_SIZES.include?(media_size.to_s) && GAP_VALUES.include?(row_gap_spacing_value.to_s)
        end
        css.strip unless css.empty?
      elsif GAP_VALUES.include?(value.to_s)
        "row_gap_#{value.underscore}"
      end
    end
  end
end
