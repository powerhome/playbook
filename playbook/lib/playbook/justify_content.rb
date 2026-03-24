# frozen_string_literal: true

module Playbook
  module JustifyContent
    def self.included(base)
      base.prop :justify_content
    end

    JUSTIFY_CONTENT_VALUES = %w[start end center spaceBetween spaceAround spaceEvenly].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def justify_content_props
      value = justify_content
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "justify_content_#{value[:default].underscore} " if value.key?(:default) && JUSTIFY_CONTENT_VALUES.include?(value[:default])
        value.each do |media_size, justify_value|
          css << "justify_content_#{media_size}_#{justify_value.underscore} " if SCREEN_SIZES.include?(media_size.to_s) && JUSTIFY_CONTENT_VALUES.include?(justify_value)
        end
        css.strip unless css.empty?
      elsif JUSTIFY_CONTENT_VALUES.include?(value)
        "justify_content_#{value.underscore}"
      end
    end

    def justify_content_options
      { justify_content: "justify_content" }
    end

    def justify_content_values
      JUSTIFY_CONTENT_VALUES
    end
  end
end
