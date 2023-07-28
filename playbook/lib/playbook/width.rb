# frozen_string_literal: true

module Playbook
  module Width
    def self.included(base)
      base.prop :width
    end

    def width_props
      if width.present?
        if width.is_a?(Hash)
          width.map do |media_size, flex_value|
            "width_#{media_size}_#{handle_width_value(flex_value)}"
          end.compact.join(" ")
        elsif valid_width_value?(width)
          "width_#{handle_width_value(width)}"
        end
      end
    end

    def width_options
      {
        width: "width",
      }
    end

    def width_values
      %w[xs sm md lg xl xxl 0 none 100]
    end

    def valid_width_value?(value)
      width_values.include?(value.to_s) || value.is_a?(Numeric)
    end

    def handle_width_value(value)
      value.is_a?(String) ? value.underscore : value
    end
  end
end
