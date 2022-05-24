# frozen_string_literal: true

module Playbook
  module JustifySelf
    def self.included(base)
      base.prop :justify_self
    end

    # rubocop:disable Style/IfInsideElse
    def justify_self_props
      selected_props = justify_self_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        justify_self_value = send(k)
        if justify_self_value.is_a?(Hash)
          justify_self_value.map do |media_size, self_value|
            "justify_self_#{media_size}_#{self_value}" if justify_self_values.include? self_value
          end
        else
          "justify_self_#{justify_self_value}" if justify_self_values.include? justify_self_value
        end
      end.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

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
