# frozen_string_literal: true

require "playbook/position_props_css"

module Playbook
  module Right
    include Playbook::PositionPropsCss

    def self.included(base)
      base.prop :right
    end

    def right_values
      %w[0 xxs xs sm md lg xl auto initial inherit]
    end

    def right_options
      {
        right: "right",
      }
    end

  private

    def right_props
      selected_props = right_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        value = send(k)
        css = positioning_css("right", value) if right.present?
        css
      end.compact.join(" ")
    end
  end
end
