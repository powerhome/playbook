# frozen_string_literal: true

module Playbook
  module MaxHeight
    def self.included(base)
      base.prop :max_height
    end

    def max_height_props
      selected_props = max_height_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        max_height_value = send(k)
        "max_height_#{max_height_value}" if max_height_values.include? max_height_value.to_s
      end.compact.join(" ")
    end

    def max_height_options
      {
        max_height: "max_height",
      }
    end

    def max_height_values
      %w[auto xs sm md lg xl xxl xxxl 100%]
    end
  end
end
