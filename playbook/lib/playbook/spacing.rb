# frozen_string_literal: true

module Playbook
  module Spacing
    def self.included(base)
      base.prop :margin
      base.prop :margin_bottom
      base.prop :margin_left
      base.prop :margin_right
      base.prop :margin_top
      base.prop :margin_x
      base.prop :margin_y
      base.prop :max_width
      base.prop :padding
      base.prop :padding_bottom
      base.prop :padding_left
      base.prop :padding_right
      base.prop :padding_top
      base.prop :padding_x
      base.prop :padding_y
    end

    def spacing_options
      {
        margin: "m",
        margin_bottom: "mb",
        margin_left: "ml",
        margin_right: "mr",
        margin_top: "mt",
        margin_x: "mx",
        margin_y: "my",
        padding: "p",
        padding_bottom: "pb",
        padding_left: "pl",
        padding_right: "pr",
        padding_top: "pt",
        padding_x: "px",
        padding_y: "py",
      }
    end

    def spacing_values
      %w[none xs sm md lg xl]
    end

    def spacing_props
      selected_props = spacing_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        spacing_value = send(k)
        "#{spacing_options[k]}_#{spacing_value}" if spacing_values.include? spacing_value
      end.compact.join(" ")
    end

    def max_width_props
      selected_mw_props = max_width_options.keys.select { |sk| try(sk) }
      return nil unless selected_mw_props.present?

      selected_mw_props.map do |k|
        width_value = send(k)
        "max_width_#{width_value}" if max_width_values.include? width_value
      end.compact.join(" ")
    end

    def max_width_options
      {
        max_width: "mw",
      }
    end

    def max_width_values
      %w[sm md lg xl]
    end
  end
end
