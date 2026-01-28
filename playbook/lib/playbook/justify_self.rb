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

      screen_size_values = %w[xs sm md lg xl]

      selected_props.map do |k|
        justify_self_value = send(k)
        if justify_self_value.is_a?(Hash)
          class_result = []

          # Handle default value separately (generates base class without size prefix)
          class_result << "justify_self_#{justify_self_value[:default]}" if justify_self_value.key?(:default) && justify_self_values.include?(justify_self_value[:default])

          # Handle responsive sizes (generates classes with size prefix)
          justify_self_value.each do |media_size, self_value|
            class_result << "justify_self_#{media_size}_#{self_value}" if screen_size_values.include?(media_size.to_s) && justify_self_values.include?(self_value)
          end

          class_result
        else
          "justify_self_#{justify_self_value}" if justify_self_values.include? justify_self_value
        end
      end.flatten.compact.join(" ")
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
