# frozen_string_literal: true

module Playbook
  module Flex
    def self.included(base)
      base.prop :flex
    end

    FLEX_VALUES = %w[auto initial 0 1 2 3 4 5 6 7 8 9 10 11 12 none].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def flex_props
      value = flex
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "flex_#{value[:default]} " if value.key?(:default) && FLEX_VALUES.include?(value[:default].to_s)
        value.each do |media_size, val|
          css << "flex_#{media_size}_#{val} " if SCREEN_SIZES.include?(media_size.to_s) && FLEX_VALUES.include?(val.to_s)
        end
        css.strip unless css.empty?
      elsif FLEX_VALUES.include?(value.to_s)
        "flex_#{value}"
      end
    end

    def flex_options
      { flex: "flex" }
    end

    def flex_values
      FLEX_VALUES
    end
  end
end
