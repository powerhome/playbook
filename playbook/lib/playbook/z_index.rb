# frozen_string_literal: true

module Playbook
  module ZIndex
    def self.included(base)
      base.prop :z_index
    end

    Z_INDEX_VALUES = %w[1 2 3 4 5 6 7 8 9 10 max].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def z_index_values
      Z_INDEX_VALUES
    end

    def z_index_options
      { z_index: "z-index" }
    end

    def screen_size_values
      SCREEN_SIZES
    end

    def z_index_props
      value = z_index
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "z_index_#{value[:default]} " if value.key?(:default) && Z_INDEX_VALUES.include?(value[:default].to_s)
        value.each do |key, val|
          css << "z_index_#{key}_#{val} " if SCREEN_SIZES.include?(key.to_s) && Z_INDEX_VALUES.include?(val.to_s)
        end
        css.strip unless css.empty?
      elsif Z_INDEX_VALUES.include?(value)
        "z_index_#{value}"
      end
    end
  end
end
