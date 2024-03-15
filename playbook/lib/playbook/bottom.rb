# frozen_string_literal: true

module Playbook
  module Bottom
    def self.included(base)
      base.prop :bottom
    end

    def bottom_values
      %w[0 xxs xs sm md lg xl auto initial inherit]
    end

    def bottom_options
      {
        bottom: "bottom",
      }
    end

  private

    def bottom_props
      selected_props = bottom_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        value = send(k)
        return nil unless bottom_values.include? value

        "bottom_#{value}"
      end.compact.join(" ")
    end
  end
end
