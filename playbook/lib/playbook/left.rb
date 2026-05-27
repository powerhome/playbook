# frozen_string_literal: true

require "playbook/position_props_css"

module Playbook
  module Left
    include Playbook::PositionPropsCss

    def self.included(base)
      base.prop :left
    end

    LEFT_VALUES = %w[0 xxs xs sm md lg xl auto initial inherit].freeze

    def left_values
      LEFT_VALUES
    end

    def left_options
      { left: "left" }
    end

  private

    def left_props
      value = left
      return nil unless value

      positioning_css("left", value)
    end
  end
end
