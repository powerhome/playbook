# frozen_string_literal: true

module Playbook
  module FlexWrap
    def self.included(base)
      base.prop :flex_wrap
    end

    # rubocop:disable Style/IfInsideElse
    def flex_wrap_props
      selected_props = flex_wrap_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      screen_size_values = %w[xs sm md lg xl]

      selected_props.map do |k|
        flex_wrap_value = send(k)
        if flex_wrap_value.is_a?(Hash)
          class_result = []

          # Handle default value separately (generates base class without size prefix)
          class_result << "flex_wrap_#{flex_wrap_value[:default].underscore}" if flex_wrap_value.key?(:default) && flex_wrap_values.include?(flex_wrap_value[:default])

          # Handle responsive sizes (generates classes with size prefix)
          flex_wrap_value.each do |media_size, wrap_value|
            class_result << "flex_wrap_#{media_size}_#{wrap_value.underscore}" if screen_size_values.include?(media_size.to_s) && flex_wrap_values.include?(wrap_value)
          end

          class_result
        else
          "flex_wrap_#{flex_wrap_value}" if flex_wrap_values.include? flex_wrap_value
        end
      end.flatten.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

    def flex_wrap_options
      {
        flex_wrap: "flex_wrap",
      }
    end

    def flex_wrap_values
      %w[wrap nowrap wrapReverse]
    end
  end
end
