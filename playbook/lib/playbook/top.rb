# frozen_string_literal: true

module Playbook
  module Top
    def self.included(base)
      base.prop :top
    end

    def top_values
      %w[none xxs xs sm md lg xl auto initial inherit]
    end

    def top_options
      {
        top: "top",
      }
    end

  private

    def top_props
      selected_props = top_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        value = send(k)
        return nil unless top_values.include? value

        "top_#{value}"
      end.compact.join(" ")
    end
  end
end
