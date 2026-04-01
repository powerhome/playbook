# frozen_string_literal: true

module Playbook
  module NumberSpacing
    def self.included(base)
      base.prop :number_spacing
    end

    NUMBER_SPACING_VALUES = %w[tabular].freeze

    def number_spacing_values
      NUMBER_SPACING_VALUES
    end

    def number_spacing_options
      { number_spacing: "ns" }
    end

  private

    def number_spacing_props
      value = number_spacing
      return nil unless value

      "ns_#{value}" if NUMBER_SPACING_VALUES.include?(value)
    end
  end
end
