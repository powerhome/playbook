# frozen_string_literal: true

module Playbook
  module BorderRadius
    def self.included(base)
      base.prop :border_radius
    end

    def border_radius_props
      selected_props = border_radius_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        border_radius_value = send(k)
        "border_radius_#{border_radius_value}" if border_radius_values.include? border_radius_value
      end.compact.join(" ")
    end

    def border_radius_options
      {
        border_radius: "border_radius",
      }
    end

    def border_radius_values
      %w[none xs sm md lg xl rounded]
    end
  end
end
