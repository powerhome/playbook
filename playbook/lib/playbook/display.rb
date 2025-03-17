# frozen_string_literal: true

module Playbook
  module Display
    def self.included(base)
      base.prop :display
    end

    def display_props
      selected_props = display_options.keys.select { |sk| try(sk) }
      responsive = selected_props.present? && try(:display).is_a?(::Hash)
      css = ""
      if responsive
        display_value = send(:display)
        display_value.each do |key, value|
          css += "display_#{key}_#{value} " if display_size_values.include?(key.to_s) && display_values.include?(value.to_s)
        end
      else
        selected_props.each do |k|
          display_value = send(k)
          css += "display_#{display_value}" if display_values.include?(display_value)
        end
      end
      css unless css.blank?
    end

    def display_options
      {
        display: "display",
      }
    end

    def display_size_values
      %w[xs sm md lg xl]
    end

    def display_values
      %w[block inline_block inline flex inline_flex none grid]
    end
  end
end
