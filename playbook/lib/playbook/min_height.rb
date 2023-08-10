# frozen_string_literal: true

module Playbook
  module MinHeight
    def self.included(base)
      base.prop :min_height
    end

    def min_height_props
      if min_height.present?
        if min_height.is_a?(Hash)
          min_height.map do |media_size, flex_value|
            "min_height_#{media_size}_#{handle_min_height_value(flex_value)}"
          end.compact.join(" ")
        elsif valid_min_height_value?(min_height)
          "min_height_#{handle_min_height_value(min_height)}"
        end
      end
    end

    def min_height_options
      {
        min_height: "min_height",
      }
    end

    def min_height_values
      %w[xs sm md lg xl xxl 0 none 100]
    end

    def valid_min_height_value?(value)
      min_height_values.include?(value.to_s) || value.is_a?(Numeric)
    end

    def handle_min_height_value(value)
      value.is_a?(String) ? value.underscore : value
    end
  end
end
