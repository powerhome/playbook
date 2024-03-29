# frozen_string_literal: true

require "playbook/position_props_css"

module Playbook
  module Left
    include Playbook::PositionPropsCss

    def self.included(base)
      base.prop :left
    end

    def left_values
      %w[0 xxs xs sm md lg xl auto initial inherit]
    end

    def left_options
      {
        left: "left",
      }
    end

  private

    def left_props
      selected_props = left_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        value = send(k)
        css = positioning_css("left", value) if left.present?
        css
      end.compact.join(" ")
    end
  end
end
