# frozen_string_literal: true

module Playbook
  module TextAlign
    def self.included(base)
      base.prop :text_align
    end

    TEXT_ALIGN_VALUES = %w[start end left right center justify justify-all match-parent].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def text_align_props
      value = text_align
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "text_align_#{value[:default].underscore} " if value.key?(:default) && TEXT_ALIGN_VALUES.include?(value[:default])
        value.each do |media_size, flex_value|
          css << "text_align_#{media_size}_#{flex_value.underscore} " if SCREEN_SIZES.include?(media_size.to_s) && TEXT_ALIGN_VALUES.include?(flex_value)
        end
        css.strip unless css.empty?
      else
        "text_align_#{value.underscore}" if TEXT_ALIGN_VALUES.include?(value)
      end
    end

    def text_align_options
      { text_align: "text_align" }
    end

    def text_align_values
      TEXT_ALIGN_VALUES
    end
  end
end
