# frozen_string_literal: true

module Playbook
  module Hover
    def self.included(base)
      base.prop :hover
    end

    def hover_options
      {
        hover: "hover",
      }
    end

    def hover_shadow_values
      %w[deep deeper deepest]
    end

    def hover_scale_values
      %w[sm md lg]
    end

    def hover_background_values
      []
    end

    def hover_color_values
      []
    end

    def hover_values
      hover_options.keys.select { |sk| try(sk) }
    end

    def hover_attributes
      %w[background shadow scale color]
    end

    def hover_props
      selected_props = hover_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      responsive = selected_props.present? && try(selected_props.first).is_a?(::Hash)
      css = ""
      selected_props.each do |prop|
        value = send(prop)
        prefix = hover_options[prop]
        if responsive
          value.each do |key, val|
            if %i[background color].include?(key)
              css += "#{prefix}_#{key}_#{val} " if hover_attributes.include?(key.to_s)
            elsif hover_attributes.include?(key.to_s) && send("hover_#{key}_values").include?(val.to_s)
              css += "#{prefix}_#{key}_#{val} "
            end
          end
        elsif send("hover_#{prop}_values").include?(value)
          css += "#{prefix}_#{value} "
        end
      end

      css.strip unless css.blank?
    end
  end
end
