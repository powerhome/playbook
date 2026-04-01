# frozen_string_literal: true

module Playbook
  module AlignSelf
    def self.included(base)
      base.prop :align_self
    end

    ALIGN_SELF_VALUES = %w[auto start end center stretch baseline].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def align_self_props
      value = align_self
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "align_self_#{value[:default]} " if value.key?(:default) && ALIGN_SELF_VALUES.include?(value[:default])
        value.each do |media_size, align_value|
          css << "align_self_#{media_size}_#{align_value} " if SCREEN_SIZES.include?(media_size.to_s) && ALIGN_SELF_VALUES.include?(align_value)
        end
        css.strip unless css.empty?
      elsif ALIGN_SELF_VALUES.include?(value)
        "align_self_#{value}"
      end
    end

    def align_self_options
      { align_self: "align_self" }
    end

    def align_self_values
      ALIGN_SELF_VALUES
    end
  end
end
