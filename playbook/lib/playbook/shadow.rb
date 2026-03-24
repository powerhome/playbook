# frozen_string_literal: true

module Playbook
  module Shadow
    def self.included(base)
      base.prop :shadow
    end

    SHADOW_VALUES = %w[none deep deeper deepest].freeze

    def shadow_props
      value = shadow
      return nil unless value

      "shadow_#{value}" if SHADOW_VALUES.include?(value)
    end

    def shadow_options
      { shadow: "shadow" }
    end

    def shadow_values
      SHADOW_VALUES
    end
  end
end
