# frozen_string_literal: true

module Playbook
  module Truncate
    def self.included(base)
      base.prop :truncate
    end

    def truncate_props
      selected_props = truncate_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        truncate_value = send(k)
        truncate_value_str = truncate_value.to_s
        "truncate_#{truncate_value_str}" if truncate_values.include?(truncate_value_str)
      end.compact.join(" ")
    end

    def truncate_options
      {
        truncate: "truncate",
      }
    end

    def truncate_values
      %w[1 2 3 4 5]
    end
  end
end
