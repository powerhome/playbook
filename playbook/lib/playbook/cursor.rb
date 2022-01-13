# frozen_string_literal: true

module Playbook
  module Cursor
    def self.included(base)
      base.prop :cursor
    end

    def cursor_props
      selected_props = cursor_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        cursor_value = send(k)
        "cursor_#{cursor_value}" if cursor_values.include? cursor_value
      end.compact.join(" ")
    end

    def cursor_options
      {
        cursor: "cursor",
      }
    end

    def cursor_values
      %w[pointer]
    end
  end
end
