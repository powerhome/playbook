# frozen_string_literal: true

module Playbook
  module NumberSpacing
    def self.included(base)
      base.prop :number_spacing
    end

  private

    def number_spacing_props
      selected_index_props = number_spacing_options.keys.select { |sk| try(sk) }
      return nil unless selected_index_props.present?

      selected_index_props.map do |k|
        index_value = send(k)
        index_value.to_s if number_spacing_values.include? index_value
      end.compact.join(" ")
    end

    def number_spacing_options
      {
        number_spacing: "ns",
      }
    end

    def number_spacing_values
      %w[tabular]
    end
  end
end
