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

    def max_width_options
      {
        max_width: "mw",
      }
    end

    def min_width_options
      {
        min_width: "minw",
      }
    end

    def width_options
      {
        width: "w",
      }
    end

    def max_width_values
      %w[0% xs sm md lg xl xxl 0 none 100%]
    end

    def min_width_values
      %w[0% xs sm md lg xl xxl 0 none 100%]
    end

    def width_values
      %w[0% xs sm md lg xl xxl 0 none 100%]
    end

    def gap_values
      %w[none xxs xs sm md lg xl]
    end

    def gap_options
      {
        gap: "gap",
      }
    end

    def column_gap_options
      {
        column_gap: "columnGap",
      }
    end

    def row_gap_options
      {
        row_gap: "rowGap",
      }
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
      %w[none xxs xs sm md lg xl auto initial inherit]
    end

    def screen_size_values
      %w[xs sm md lg xl default]
    end

    def break_method_values
      %w[on at]
    end

    def spacing_props
      selected_props = spacing_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      css = ""
      selected_props.each do |prop|
        responsive = try(prop).is_a?(::Hash)
        spacing_value = send(prop)
        prefix = spacing_options[prop]

        if responsive
          default_value = spacing_value.delete(:default) || nil
          break_value = spacing_value.delete(:break) || break_method_values.first
          spacing_value.each do |key, value|
            css += "break_#{break_value}_#{key}\:#{prefix}_#{value} " if screen_size_values.include?(key.to_s) && spacing_values.include?(value.to_s)
          end

          css += "#{prefix}_#{default_value} " if spacing_values.include?(default_value)
        elsif spacing_values.include?(spacing_value)
          css += "#{prefix}_#{spacing_value} "
        end
      end

      css.strip unless css.blank?
    end

    def filter_classname(value)
      if value.include?("%")
        value.gsub("%", "_percent")
      else
        value
      end
    end

    def min_width_props
      selected_minw_props = min_width_options.keys.select { |sk| try(sk) }
      return nil unless selected_minw_props.present?

      selected_minw_props.map do |k|
        width_value = send(k)
        "min_width_#{filter_classname(width_value)}" if min_width_values.include? width_value
      end.compact.join(" ")
    end

    def max_width_props
      selected_mw_props = max_width_options.keys.select { |sk| try(sk) }
      return nil unless selected_mw_props.present?

      selected_mw_props.map do |k|
        width_value = send(k)
        "max_width_#{filter_classname(width_value)}" if max_width_values.include? width_value
      end.compact.join(" ")
    end

    def width_props
      selected_w_props = width_options.keys.select { |sk| try(sk) }
      return nil unless selected_w_props.present?

      selected_w_props.map do |k|
        width_value = send(k)
        "width_#{filter_classname(width_value)}" if width_values.include? width_value
      end.compact.join(" ")
    end

    def gap_props
      selected_gap_props = gap_options.keys.select { |sk| try(sk) }
      return nil unless selected_gap_props.present?

      selected_gap_props.map do |k|
        gap_value = send(k)
        if gap_value.is_a?(Hash)
          gap_value.map do |media_size, gap_spacing_value|
            "gap_#{media_size}_#{gap_spacing_value.underscore}" if gap_values.include?(gap_spacing_value.to_s)
          end
        elsif gap_values.include?(gap_value.to_s)
          "gap_#{gap_value.underscore}"
        end
      end.compact.join(" ")
    end

    def column_gap_props
      selected_column_gap_props = column_gap_options.keys.select { |sk| try(sk) }
      return nil unless selected_column_gap_props.present?

      selected_column_gap_props.map do |k|
        column_gap_value = send(k)
        if column_gap_value.is_a?(Hash)
          column_gap_value.map do |media_size, column_gap_spacing_value|
            "columnGap_#{media_size}_#{column_gap_spacing_value.underscore}" if gap_values.include?(column_gap_spacing_value.to_s)
          end
        elsif gap_values.include?(column_gap_value.to_s)
          "columnGap_#{column_gap_value.underscore}"
        end
      end.compact.join(" ")
    end

    def row_gap_props
      selected_row_gap_props = row_gap_options.keys.select { |sk| try(sk) }
      return nil unless selected_row_gap_props.present?

      selected_row_gap_props.map do |k|
        row_gap_value = send(k)
        if row_gap_value.is_a?(Hash)
          row_gap_value.map do |media_size, row_gap_spacing_value|
            "rowGap_#{media_size}_#{row_gap_spacing_value.underscore}" if gap_values.include?(row_gap_spacing_value.to_s)
          end
        elsif gap_values.include?(row_gap_value.to_s)
          "rowGap_#{row_gap_value.underscore}"
        end
      end.compact.join(" ")
    end
  end
end
