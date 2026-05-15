# frozen_string_literal: true

module Playbook
  module LineHeight
    def self.included(base)
      base.prop :line_height
    end

    LINE_HEIGHT_VALUES = %w[tightest tighter tight normal loose looser loosest].freeze

    def line_height_props
      value = line_height
      return nil unless value

      "line_height_#{value}" if LINE_HEIGHT_VALUES.include?(value)
    end

    def line_height_options
      { line_height: "line_height" }
    end

    def line_height_values
      LINE_HEIGHT_VALUES
    end
  end
end
