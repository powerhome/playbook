# frozen_string_literal: true

module Playbook
  module AlignItems
    def self.included(base)
      base.prop :align_items
    end

    # rubocop:disable Style/IfInsideElse
    def align_items_props
      selected_props = align_items_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      screen_size_values = %w[xs sm md lg xl]

      selected_props.map do |k|
        align_items_value = send(k)
        if align_items_value.is_a?(Hash)
          class_result = []

          # Handle default value separately (generates base class without size prefix)
          class_result << "align_items_#{align_items_value[:default].underscore}" if align_items_value.key?(:default) && align_items_values.include?(align_items_value[:default].to_s)

          # Handle responsive sizes (generates classes with size prefix)
          align_items_value.each do |media_size, align_value|
            class_result << "align_items_#{media_size}_#{align_value.underscore}" if screen_size_values.include?(media_size.to_s) && align_items_values.include?(align_value.to_s)
          end

          class_result
        else
          "align_items_#{align_items_value.underscore}" if align_items_values.include? align_items_value
        end
      end.flatten.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

    def align_items_options
      {
        align_items: "align_items",
      }
    end

    def align_items_values
      %w[flexStart flexEnd start end center baseline stretch]
    end
  end
end
