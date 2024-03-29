# frozen_string_literal: true

module Playbook
  module PositionPropsCss
    POSITION_VALUES = %w[0 xxs xs sm md lg xl auto initial inherit].freeze

    def positioning_css(property, value)
      if value.is_a?(String)
        "#{property}_#{value}"
      elsif value.is_a?(Hash) && value.key?(:inset)
        "#{property}_#{value[:value]}_inset"
      elsif value.is_a?(Hash)
        "#{property}_#{value[:value]}"
      end
    end
  end
end
