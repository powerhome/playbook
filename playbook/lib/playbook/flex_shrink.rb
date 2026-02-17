# frozen_string_literal: true

module Playbook
  module FlexShrink
    def self.included(base)
      base.prop :flex_shrink
    end

    # rubocop:disable Style/IfInsideElse
    def flex_shrink_props
      selected_props = flex_shrink_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      screen_size_values = %w[xs sm md lg xl]

      selected_props.map do |k|
        flex_shrink_value = send(k)
        if flex_shrink_value.is_a?(Hash)
          class_result = []

          # Handle default value separately (generates base class without size prefix)
          class_result << "flex_shrink_#{flex_shrink_value[:default]}" if flex_shrink_value.key?(:default) && flex_shrink_values.include?(flex_shrink_value[:default].to_s)

          # Handle responsive sizes (generates classes with size prefix)
          flex_shrink_value.each do |media_size, shrink_value|
            class_result << "flex_shrink_#{media_size}_#{shrink_value}" if screen_size_values.include?(media_size.to_s) && flex_shrink_values.include?(shrink_value.to_s)
          end

          class_result
        else
          "flex_shrink_#{flex_shrink_value}" if flex_shrink_values.include? flex_shrink_value.to_s
        end
      end.flatten.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

    def flex_shrink_options
      {
        flex_shrink: "flex_shrink",
      }
    end

    def flex_shrink_values
      %w[1 0]
    end
  end
end
