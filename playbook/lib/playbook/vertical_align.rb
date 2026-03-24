# frozen_string_literal: true

module Playbook
  module VerticalAlign
    def self.included(base)
      base.prop :vertical_align
    end

    VERTICAL_ALIGN_VALUES = %w[baseline super top middle bottom sub text-top text-bottom].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def vertical_align_props
      value = vertical_align
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "vertical_align_#{value[:default].underscore} " if value.key?(:default) && VERTICAL_ALIGN_VALUES.include?(value[:default])
        value.each do |media_size, flex_value|
          css << "vertical_align_#{media_size}_#{flex_value.underscore} " if SCREEN_SIZES.include?(media_size.to_s) && VERTICAL_ALIGN_VALUES.include?(flex_value)
        end
        css.strip unless css.empty?
      else
        "vertical_align_#{value.underscore}" if VERTICAL_ALIGN_VALUES.include?(value)
      end
    end

    def vertical_align_options
      { vertical_align: "vertical_align" }
    end

    def vertical_align_values
      VERTICAL_ALIGN_VALUES
    end
  end
end
