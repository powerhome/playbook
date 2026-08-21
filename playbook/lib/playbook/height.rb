# frozen_string_literal: true

module Playbook
  module Height
    def self.included(base)
      base.prop :height
    end

    HEIGHT_VALUES = %w[auto xs sm md lg xl xxl xxxl 100% 100vh].freeze

    def height_props
      value = height
      return nil unless value

      "height_#{filter_classname(value.to_s)}" if HEIGHT_VALUES.include?(value.to_s)
    end

    def height_options
      { height: "height" }
    end

    def height_values
      HEIGHT_VALUES
    end
  end
end
