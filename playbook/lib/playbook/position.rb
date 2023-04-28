# frozen_string_literal: true

module Playbook
  module Position
    def self.included(base)
      base.prop :position
    end

    def position_values
      %w[relative absolute fixed sticky]
    end

    def position_options
      {
        position: "position",
      }
    end

  private

    def position_props
      selected_props = position_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        value = send(k)
        return nil unless position_values.include? value

        "position_#{value}"
      end.compact.join(" ")
    end
  end
end
