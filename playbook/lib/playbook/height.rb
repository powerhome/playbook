# frozen_string_literal: true

module Playbook
  module Height
    def self.included(base)
      base.prop :height
    end

    def height_props
      selected_props = height_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        height_value = send(k)
        "height_#{height_value}" if height_values.include? height_value.to_s
      end.compact.join(" ")
    end

    def height_options
      {
        height: "height",
      }
    end

    def height_values
      %w[auto xs sm md lg xl xxl xxxl 100%]
    end
  end
end
