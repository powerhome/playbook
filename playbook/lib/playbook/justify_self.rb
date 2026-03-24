# frozen_string_literal: true

module Playbook
  module JustifySelf
    def self.included(base)
      base.prop :justify_self
    end

    JUSTIFY_SELF_VALUES = %w[auto start end center stretch].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def justify_self_props
      value = justify_self
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "justify_self_#{value[:default]} " if value.key?(:default) && JUSTIFY_SELF_VALUES.include?(value[:default])
        value.each do |media_size, self_value|
          css << "justify_self_#{media_size}_#{self_value} " if SCREEN_SIZES.include?(media_size.to_s) && JUSTIFY_SELF_VALUES.include?(self_value)
        end
        css.strip unless css.empty?
      elsif JUSTIFY_SELF_VALUES.include?(value)
        "justify_self_#{value}"
      end
    end

    def justify_self_options
      { justify_self: "justify_self" }
    end

    def justify_self_values
      JUSTIFY_SELF_VALUES
    end
  end
end
