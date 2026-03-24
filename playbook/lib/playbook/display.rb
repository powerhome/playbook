# frozen_string_literal: true

module Playbook
  module Display
    def self.included(base)
      base.prop :display
    end

    DISPLAY_VALUES = %w[block inline_block inline flex inline_flex none grid].freeze
    DISPLAY_SIZE_VALUES = %w[xs sm md lg xl].freeze

    def display_props
      value = display
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "display_#{value[:default]} " if value.key?(:default) && DISPLAY_VALUES.include?(value[:default].to_s)
        value.each do |key, val|
          css << "display_#{key}_#{val} " if DISPLAY_SIZE_VALUES.include?(key.to_s) && DISPLAY_VALUES.include?(val.to_s)
        end
        css.strip unless css.empty?
      else
        "display_#{value}" if DISPLAY_VALUES.include?(value)
      end
    end

    def display_options
      { display: "display" }
    end

    def display_size_values
      DISPLAY_SIZE_VALUES
    end

    def display_values
      DISPLAY_VALUES
    end
  end
end
