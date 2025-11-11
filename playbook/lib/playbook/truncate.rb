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
        truncate_value = send(k).to_s
        "truncate_#{truncate_value}" if truncate_values.include?(truncate_value)
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
