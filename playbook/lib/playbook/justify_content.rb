# frozen_string_literal: true

module Playbook
  module JustifyContent
    def self.included(base)
      base.prop :justify_content
    end

    def justify_content_props
      selected_props = justify_content_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        justify_content_value = send(k)
        "justify_content_#{justify_content_value}" if justify_content_values.include? justify_content_value
      end.compact.join(" ")
    end

    def justify_content_options
      {
        justify_content: "justify_content",
      }
    end

    def justify_content_values
      %w[start end center space_between space_around space_evenly]
    end
  end
end
