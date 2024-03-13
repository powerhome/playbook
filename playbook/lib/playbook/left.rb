# frozen_string_literal: true

module Playbook
  module Left
    def self.included(base)
      base.prop :left
    end

    def left_values
      %w[none xxs xs sm md lg xl auto initial inherit]
    end

    def left_options
      {
        left: "left",
      }
    end

  private

    def left_props
      selected_props = left_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        value = send(k)
        return nil unless left_values.include? value

        "left_#{value}"
      end.compact.join(" ")
    end
  end
end
