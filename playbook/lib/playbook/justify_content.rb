# frozen_string_literal: true

module Playbook
  module JustifyContent
    def self.included(base)
      base.prop :justify_content
    end

    # rubocop:disable Style/IfInsideElse
    def justify_content_props
      selected_props = justify_content_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        justify_content_value = send(k)
        if justify_content_value.is_a?(Hash)
          justify_content_value.map do |media_size, justify_value|
            "justify_content_#{media_size}_#{justify_value.underscore}" if justify_content_values.include? justify_value
          end
        else
          "justify_content_#{justify_content_value.underscore}" if justify_content_values.include? justify_content_value
        end
      end.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

    def justify_content_options
      {
        justify_content: "justify_content",
      }
    end

    def justify_content_values
      %w[start end center spaceBetween spaceAround spaceEvenly]
    end
  end
end
