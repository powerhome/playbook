# frozen_string_literal: true

module Playbook
  module MinHeight
    def self.included(base)
      base.prop :min_height
    end

    MIN_HEIGHT_VALUES = %w[auto xs sm md lg xl xxl xxxl 100% 100vh].freeze

    def min_height_props
      value = min_height
      return nil unless value

      "min_height_#{filter_classname(value.to_s)}" if MIN_HEIGHT_VALUES.include?(value.to_s)
    end

    def min_height_options
      { min_height: "min_height" }
    end

    def min_height_values
      MIN_HEIGHT_VALUES
    end
  end
end
