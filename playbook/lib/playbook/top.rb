# frozen_string_literal: true

require "playbook/position_props_css"

module Playbook
  module Top
    include Playbook::PositionPropsCss

    def self.included(base)
      base.prop :top
    end

    TOP_VALUES = %w[0 xxs xs sm md lg xl auto initial inherit].freeze

    def top_values
      TOP_VALUES
    end

    def top_options
      { top: "top" }
    end

  private

    def top_props
      value = top
      return nil unless value

      positioning_css("top", value)
    end
  end
end
