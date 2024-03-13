# frozen_string_literal: true

module Playbook
  module Right
    def self.included(base)
      base.prop :right
    end

    def right_values
      %w[none xxs xs sm md lg xl auto initial inherit]
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
        return nil unless right_values.include? value

        "right_#{value}"
      end.compact.join(" ")
    end
  end
end
