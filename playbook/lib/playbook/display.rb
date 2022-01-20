# frozen_string_literal: true

module Playbook
  module Display
    def self.included(base)
      base.prop :display
    end

    def display_props
      selected_props = display_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        display_value = send(k)
        "display_#{display_value}" if display_values.include? display_value
      end.compact.join(" ")
    end

    def display_options
      {
        display: "display",
      }
    end

    def display_values
      %w[block inline_block inline flex inline_flex hidden]
    end
  end
end
