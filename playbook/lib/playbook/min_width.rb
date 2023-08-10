# frozen_string_literal: true

module Playbook
  module MinWidth
    def self.included(base)
      base.prop :min_width
    end

    def min_width_props
      if min_width.present?
        if min_width.is_a?(Hash)
          min_width.map do |media_size, flex_value|
            "min_width_#{media_size}_#{handle_min_width_value(flex_value)}"
          end.compact.join(" ")
        elsif valid_min_width_value?(min_width)
          "min_width_#{handle_min_width_value(min_width)}"
        end
      end
    end

    def min_width_options
      {
        min_width: "min_width",
      }
    end

    def min_width_values
      %w[xs sm md lg xl xxl 0 none 100]
    end

    def valid_min_width_value?(value)
      min_width_values.include?(value.to_s) || value.is_a?(Numeric)
    end

    def handle_min_width_value(value)
      value.is_a?(String) ? value.underscore : value
    end
  end
end
