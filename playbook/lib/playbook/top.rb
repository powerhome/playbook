# frozen_string_literal: true

require "playbook/position_props_css"

module Playbook
  module Top
    include Playbook::PositionPropsCss

    def self.included(base)
      base.prop :top
    end

    def top_values
      %w[0 xxs xs sm md lg xl auto initial inherit]
    end

    def top_options
      {
        top: "top",
      }
    end

  private

    def top_props
      selected_props = top_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        value = send(k)
        css = positioning_css("top", value) if top.present?
        css
      end.compact.join(" ")
    end
  end
end
