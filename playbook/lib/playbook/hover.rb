# frozen_string_literal: true

module Playbook
  module Hover
    def self.included(base)
      base.prop :hover
      base.prop :group_hover, type: Playbook::Props::Boolean, default: false
    end

    HOVER_SHADOW_VALUES = %w[deep deeper deepest].freeze
    HOVER_SCALE_VALUES = %w[sm md lg].freeze
    HOVER_BACKGROUND_VALUES = [].freeze
    HOVER_COLOR_VALUES = [].freeze
    HOVER_UNDERLINE_VALUES = [true, false].freeze
    HOVER_VISIBLE_VALUES = %w[true false].freeze
    HOVER_ATTRIBUTES = %w[background shadow scale color underline visible].freeze

    def hover_options
      { hover: "hover" }
    end

    def hover_shadow_values
      HOVER_SHADOW_VALUES
    end

    def hover_scale_values
      HOVER_SCALE_VALUES
    end

    def hover_background_values
      HOVER_BACKGROUND_VALUES
    end

    def hover_color_values
      HOVER_COLOR_VALUES
    end

    def hover_underline_values
      HOVER_UNDERLINE_VALUES
    end

    def hover_visible_values
      HOVER_VISIBLE_VALUES
    end

    def hover_values
      hover_options.keys.select { |sk| try(sk) }
    end

    def hover_attributes
      HOVER_ATTRIBUTES
    end

    def hover_props
      value = hover
      gh = group_hover

      return nil if !value && !gh

      css = +""
      if value
        if value.is_a?(::Hash)
          value.each do |key, val|
            if %i[background color].include?(key)
              css << "hover_#{key}-#{val} " if HOVER_ATTRIBUTES.include?(key.to_s)
            elsif key == :underline && val == true
              css << "hover_underline "
            elsif HOVER_ATTRIBUTES.include?(key.to_s) && send("hover_#{key}_values").include?(val.to_s)
              css << "hover_#{key}_#{val} "
            end
          end
        elsif send("hover_hover_values").include?(value)
          css << "hover_#{value} "
        end
      end

      css << "group_hover " if gh
      css.strip unless css.empty?
    end
  end
end
