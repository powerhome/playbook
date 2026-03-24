# frozen_string_literal: true

module Playbook
  module AlignItems
    def self.included(base)
      base.prop :align_items
    end

    ALIGN_ITEMS_VALUES = %w[flexStart flexEnd start end center baseline stretch].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def align_items_props
      value = align_items
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "align_items_#{value[:default].underscore} " if value.key?(:default) && ALIGN_ITEMS_VALUES.include?(value[:default].to_s)
        value.each do |media_size, align_value|
          css << "align_items_#{media_size}_#{align_value.underscore} " if SCREEN_SIZES.include?(media_size.to_s) && ALIGN_ITEMS_VALUES.include?(align_value.to_s)
        end
        css.strip unless css.empty?
      elsif ALIGN_ITEMS_VALUES.include?(value)
        "align_items_#{value.underscore}"
      end
    end

    def align_items_options
      { align_items: "align_items" }
    end

    def align_items_values
      ALIGN_ITEMS_VALUES
    end
  end
end
