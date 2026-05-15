# frozen_string_literal: true

require "playbook/position_props_css"

module Playbook
  module Right
    include Playbook::PositionPropsCss

    def self.included(base)
      base.prop :right
    end

    RIGHT_VALUES = %w[0 xxs xs sm md lg xl auto initial inherit].freeze

    def right_values
      RIGHT_VALUES
    end

    def right_options
      { right: "right" }
    end

  private

    def right_props
      value = right
      return nil unless value

      positioning_css("right", value)
    end
  end
end
