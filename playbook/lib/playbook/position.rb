# frozen_string_literal: true

module Playbook
  module Position
    def self.included(base)
      base.prop :position
    end

  private

    def position_props
      selected_props = position_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        value = send(k)
        "#{value}_position" if (position_values.include? value) && (value != "static")
      end.compact.join(" ")
    end

    def position_options
      {
        position: "position",
      }
    end

    def position_values
      %w[relative absolute fixed sticky static]
    end
  end
end
