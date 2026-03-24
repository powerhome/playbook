# frozen_string_literal: true

module Playbook
  module AlignContent
    def self.included(base)
      base.prop :align_content
    end

    ALIGN_CONTENT_VALUES = %w[start end center spaceBetween spaceAround spaceEvenly].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def align_content_props
      value = align_content
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "align_content_#{value[:default].underscore} " if value.key?(:default) && ALIGN_CONTENT_VALUES.include?(value[:default])
        value.each do |media_size, align_value|
          css << "align_content_#{media_size}_#{align_value.underscore} " if SCREEN_SIZES.include?(media_size.to_s) && ALIGN_CONTENT_VALUES.include?(align_value)
        end
        css.strip unless css.empty?
      else
        "align_content_#{value.underscore}" if ALIGN_CONTENT_VALUES.include?(value)
      end
    end

    def align_content_options
      { align_content: "align_content" }
    end

    def align_content_values
      ALIGN_CONTENT_VALUES
    end
  end
end
