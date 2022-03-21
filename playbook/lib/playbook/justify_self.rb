# frozen_string_literal: true

module Playbook
  module JustifySelf
    def self.included(base)
      base.prop :justify_self
    end

    def justify_self_props
      selected_props = justify_self_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        justify_self_value = send(k)
        "justify_self_#{justify_self_value}" if justify_self_values.include? justify_self_value
      end.compact.join(" ")
    end

    def justify_self_options
      {
        justify_self: "justify_self",
      }
    end

    def justify_self_values
      %w[auto start end center stretch]
    end
  end
end
