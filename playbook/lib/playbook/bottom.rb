# frozen_string_literal: true

require "playbook/position_props_css"

module Playbook
  module Bottom
    include Playbook::PositionPropsCss

    def self.included(base)
      base.prop :bottom
    end

    BOTTOM_VALUES = %w[0 xxs xs sm md lg xl auto initial inherit].freeze

    def bottom_values
      BOTTOM_VALUES
    end

    def bottom_options
      { bottom: "bottom" }
    end

  private

    def bottom_props
      value = bottom
      return nil unless value

      positioning_css("bottom", value)
    end
  end
end
