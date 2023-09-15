# frozen_string_literal: true

module Playbook
  module Overflow
    def self.included(base)
      base.prop :overflow
      base.prop :overflow_x
      base.prop :overflow_y
    end

    def overflow_values
      %w[visible hidden scroll auto]
    end

    def overflow_options
      {
        overflow: "overflow",
        overflow_x: "overflow_x",
        overflow_y: "overflow_y",
      }
    end

    def overflow_props
      selected_props = overflow_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        overflow_value = send(k)
        "#{overflow_options[k]}_#{overflow_value}" if overflow_values.include? overflow_value
      end.compact.join(" ")
    end
  end
end
