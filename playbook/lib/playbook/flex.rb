# frozen_string_literal: true

module Playbook
  module Flex
    def self.included(base)
      base.prop :flex
    end

    # rubocop:disable Style/IfInsideElse
    def flex_props
      selected_props = flex_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      screen_size_values = %w[xs sm md lg xl]

      selected_props.map do |k|
        flex_value = send(k)
        if flex_value.is_a?(Hash)
          class_result = []

          # Handle default value separately (generates base class without size prefix)
          class_result << "flex_#{flex_value[:default]}" if flex_value.key?(:default) && flex_values.include?(flex_value[:default].to_s)

          # Handle responsive sizes (generates classes with size prefix)
          flex_value.each do |media_size, value|
            class_result << "flex_#{media_size}_#{value}" if screen_size_values.include?(media_size.to_s) && flex_values.include?(value.to_s)
          end

          class_result
        else
          "flex_#{flex_value}" if flex_values.include? flex_value.to_s
        end
      end.flatten.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

    def flex_options
      {
        flex: "flex",
      }
    end

    def flex_values
      %w[auto initial 0 1 2 3 4 5 6 7 8 9 10 11 12 none]
    end
  end
end
