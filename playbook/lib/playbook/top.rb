# frozen_string_literal: true

module Playbook
  module Top
    def self.included(base)
      base.prop :top
    end

    def top_values
      %w[0 xxs xs sm md lg xl auto initial inherit]
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
        css = if value.is_a?(Hash) && value[:inset] && top_values.include?(value[:value])
                "top_#{value[:value]}_inset"
              elsif top_values.include?(value)
                "top_#{value}"
              end
        css
      end.compact.join(" ")
    end
  end
end
