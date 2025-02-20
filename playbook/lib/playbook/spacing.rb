# frozen_string_literal: true

module Playbook
  module Spacing
    def self.included(base)
      base.prop :gap
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
        "gap_#{gap_value}" if gap_values.include? gap_value
      end.compact.join(" ")
    end
  end
end
