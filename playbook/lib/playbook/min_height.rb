# frozen_string_literal: true

module Playbook
  module MinHeight
    def self.included(base)
      base.prop :min_height
    end

    def min_height_props
      selected_props = min_height_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        min_height_value = send(k)
        "min_height_#{min_height_value}" if min_height_values.include? min_height_value.to_s
      end.compact.join(" ")
    end

    def min_height_options
      {
        min_height: "min_height",
      }
    end

    def min_height_values
      %w[auto xs sm md lg xl xxl xxxl 100%]
    end
  end
end
