# frozen_string_literal: true

module Playbook
  module BorderRadius
    def self.included(base)
      base.prop :border_radius
    end

    BORDER_RADIUS_VALUES = %w[none xs sm md lg xl rounded].freeze

    def border_radius_props
      value = border_radius
      return nil unless value

      "border_radius_#{value}" if BORDER_RADIUS_VALUES.include?(value)
    end

    def border_radius_options
      { border_radius: "border_radius" }
    end

    def border_radius_values
      BORDER_RADIUS_VALUES
    end
  end
end
