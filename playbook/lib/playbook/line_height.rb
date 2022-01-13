# frozen_string_literal: true

module Playbook
  module LineHeight
    def self.included(base)
      base.prop :line_height
    end

    def line_height_props
      selected_props = line_height_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        line_height_value = send(k)
        "line_height_#{line_height_value}" if line_height_values.include? line_height_value
      end.compact.join(" ")
    end

    def line_height_options
      {
        line_height: "line_height",
      }
    end

    def line_height_values
      %w[tightest tighter tight normal loose looser loosest]
    end
  end
end
