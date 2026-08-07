# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    # Mirrors React ColumnLayoutHelper: maps column_styling width keys to inline
    # styles on header/body cells so columns stay stable when rows expand/collapse.
    module ColumnLayoutHelper
      # Converts a Playbook column width value to a CSS length string.
      # Numbers are treated as pixels; strings are passed through (e.g. "12rem", "200px").
      def css_length(value)
        return nil if value.nil? || value == ""

        return "#{value}px" if value.is_a?(Numeric)

        value.to_s
      end

      # Reads a styling length from column_styling, accepting snake_case or camelCase keys.
      def read_styling_length(styling, *keys)
        return nil unless styling.is_a?(Hash)

        keys.each do |key|
          value = styling[key] || styling[key.to_s] || styling[key.to_sym]
          return value unless value.nil?
        end
        nil
      end

      # Builds layout styles from a column definition that may include :column_styling.
      def build_column_layout_styles_from_column(column)
        return {} unless column.is_a?(Hash)

        styling = column[:column_styling] || column["column_styling"] || {}
        build_column_layout_styles(styling)
      end

      # Inline width styles for <th> / <td>. Returns a hash with :width, :min_width,
      # and/or :max_width (CSS length strings). KitBase converts snake_case keys to
      # kebab-case CSS properties.
      #
      # If only +width+ is set (no min/max), all three are locked to that value.
      def build_column_layout_styles(styling)
        return {} unless styling.is_a?(Hash) && styling.present?

        styling_width = read_styling_length(styling, :width, "width")
        styling_min = read_styling_length(styling, :min_width, "min_width", :minWidth, "minWidth")
        styling_max = read_styling_length(styling, :max_width, "max_width", :maxWidth, "maxWidth")

        has_width = !styling_width.nil? && styling_width != ""
        has_min = !styling_min.nil? && styling_min != ""
        has_max = !styling_max.nil? && styling_max != ""

        width_value = has_width ? styling_width : nil
        min_value = has_min ? styling_min : nil
        max_value = has_max ? styling_max : nil

        if has_width && !has_min && !has_max
          min_value = styling_width
          max_value = styling_width
          width_value = styling_width
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
    end
  end
end
