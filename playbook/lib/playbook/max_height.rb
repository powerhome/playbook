# frozen_string_literal: true

module Playbook
  module MaxHeight
    def self.included(base)
      base.prop :max_height
    end

    MAX_HEIGHT_VALUES = %w[auto xs sm md lg xl xxl xxxl 100% 100vh].freeze

    def max_height_props
      value = max_height
      return nil unless value

      "max_height_#{filter_classname(value.to_s)}" if MAX_HEIGHT_VALUES.include?(value.to_s)
    end

    def max_height_options
      { max_height: "max_height" }
    end

    def max_height_values
      MAX_HEIGHT_VALUES
    end
  end
end
