# frozen_string_literal: true

module Playbook
  module FlexDirection
    def self.included(base)
      base.prop :flex_direction
    end

    def flex_direction_props
      selected_props = flex_direction_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        flex_direction_value = send(k)
        "flex_direction_#{flex_direction_value}" if flex_direction_values.include? flex_direction_value
      end.compact.join(" ")
    end

    def flex_direction_options
      {
        flex_direction: "flex_direction",
      }
    end

    def flex_direction_values
      %w[row column row_reverse column_reverse]
    end
  end
end
