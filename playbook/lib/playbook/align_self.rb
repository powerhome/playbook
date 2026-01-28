# frozen_string_literal: true

module Playbook
  module AlignSelf
    def self.included(base)
      base.prop :align_self
    end

    # rubocop:disable Style/IfInsideElse
    def align_self_props
      selected_props = align_self_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      screen_size_values = %w[xs sm md lg xl]

      selected_props.map do |k|
        align_self_value = send(k)
        if align_self_value.is_a?(Hash)
          class_result = []

          # Handle default value separately (generates base class without size prefix)
          class_result << "align_self_#{align_self_value[:default]}" if align_self_value.key?(:default) && align_self_values.include?(align_self_value[:default])

          # Handle responsive sizes (generates classes with size prefix)
          align_self_value.each do |media_size, align_value|
            class_result << "align_self_#{media_size}_#{align_value}" if screen_size_values.include?(media_size.to_s) && align_self_values.include?(align_value)
          end

          class_result
        else
          "align_self_#{align_self_value}" if align_self_values.include? align_self_value
        end
      end.flatten.compact.join(" ")
      # rubocop:enable Style/IfInsideElse
    end

    def align_self_options
      {
        align_self: "align_self",
      }
    end

    def align_self_values
      %w[auto start end center stretch baseline]
    end
  end
end
