# frozen_string_literal: true

module Playbook
  module Position
    def self.included(base)
      base.prop :position
    end

    POSITION_VALUES = %w[relative absolute fixed sticky].freeze

    def position_values
      POSITION_VALUES
    end

    def position_options
      { position: "position" }
    end

  private

    def position_props
      value = position
      return nil unless value

      "position_#{value}" if POSITION_VALUES.include?(value)
    end
  end
end
