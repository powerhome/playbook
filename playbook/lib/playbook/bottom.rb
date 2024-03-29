# frozen_string_literal: true

require "playbook/position_props_css"

module Playbook
  module Bottom
    include Playbook::PositionPropsCss

    def self.included(base)
      base.prop :bottom
    end

    def bottom_values
      %w[0 xxs xs sm md lg xl auto initial inherit]
    end

    def bottom_options
      {
        bottom: "bottom",
      }
    end

  private

    def bottom_props
      selected_props = bottom_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        value = send(k)
        css = positioning_css("bottom", value) if bottom.present?
        css
      end.compact.join(" ")
    end
  end
end
