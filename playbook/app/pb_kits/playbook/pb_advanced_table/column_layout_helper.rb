# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    # Mirrors React ColumnLayoutHelper width rules for Rails column_styling.
    # Numbers become px; CSS length strings pass through.
    # width alone locks min_width and max_width to the same value (fixed column).
    module ColumnLayoutHelper
    module_function

      def css_length(value)
        return nil if value.nil? || value == ""

        return "#{value}px" if value.is_a?(Numeric)

        value.to_s
      end

      def build_column_layout_styles(column_styling)
        return {} unless column_styling.is_a?(Hash)

        width = read_styling_length(column_styling, :width)
        min_width = read_styling_length(column_styling, :min_width, :minWidth)
        max_width = read_styling_length(column_styling, :max_width, :maxWidth)

        has_width = !width.nil? && width != ""
        has_min = !min_width.nil? && min_width != ""
        has_max = !max_width.nil? && max_width != ""

        width_value = has_width ? width : nil
        min_value = has_min ? min_width : nil
        max_value = has_max ? max_width : nil

        if has_width && !has_min && !has_max
          min_value = width
          max_value = width
          width_value = width
        end

        styles = {}
        width_css = css_length(width_value)
        min_css = css_length(min_value)
        max_css = css_length(max_value)

        styles[:width] = width_css if width_css
        styles[:min_width] = min_css if min_css
        styles[:max_width] = max_css if max_css
        styles
      end

      def read_styling_length(styling, *keys)
        keys.each do |key|
          value = styling[key] || styling[key.to_s]
          return value unless value.nil?
        end
        nil
      end
      private_class_method :read_styling_length
    end
  end
end
