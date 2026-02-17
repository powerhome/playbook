# frozen_string_literal: true

module Playbook
  module AlignContent
    def self.included(base)
      base.prop :align_content
    end

    # rubocop:disable Style/IfInsideElse
    def align_content_props
      selected_props = align_content_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      screen_size_values = %w[xs sm md lg xl]

      selected_props.map do |k|
        align_content = send(k)
        if align_content.is_a?(Hash)
          class_result = []

          # Handle default value separately (generates base class without size prefix)
          class_result << "align_content_#{align_content[:default].underscore}" if align_content.key?(:default) && align_content_values.include?(align_content[:default])

          # Handle responsive sizes (generates classes with size prefix)
          align_content.each do |media_size, align_value|
            class_result << "align_content_#{media_size}_#{align_value.underscore}" if screen_size_values.include?(media_size.to_s) && align_content_values.include?(align_value)
          end

          class_result
        else
          "align_content_#{align_content.underscore}" if align_content_values.include? align_content
        end
      end.flatten.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

    def align_content_options
      {
        align_content: "align_content",
      }
    end

    def align_content_values
      %w[start end center spaceBetween spaceAround spaceEvenly]
    end
  end
end
