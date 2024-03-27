# frozen_string_literal: true

module Playbook
  module Right
    def self.included(base)
      base.prop :right
    end

    def right_values
      %w[0 xxs xs sm md lg xl auto initial inherit]
    end

    def right_options
      {
        right: "right",
      }
    end

  private

    def right_props
      selected_props = right_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        value = send(k)
        css = if value.is_a?(Hash) && value[:inset] && right_values.include?(value[:value])
                "right_#{value[:value]}_inset"
              elsif right_values.include?(value)
                "right_#{value}"
              end
        css
      end.compact.join(" ")
    end
  end
end
