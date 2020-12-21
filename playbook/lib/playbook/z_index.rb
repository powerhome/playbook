# frozen_string_literal: true

module Playbook
  module ZIndex
    def self.included(base)
      base.prop :z_index
    end

  private

    def z_index_props
      selected_index_props = z_index_options.keys.select { |sk| try(sk) }
      return nil unless selected_index_props.present?

      selected_index_props.map do |k|
        index_value = send(k)
        "z_index_#{index_value}" if z_index_values.include? index_value
      end.compact.join(" ")
    end

    def z_index_options
      {
        z_index: "z-index",
      }
    end

    def z_index_values
      %w[1 2 3 4 5 6 7 8 9 10]
    end
  end
end
