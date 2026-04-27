# frozen_string_literal: true

module Playbook
  module Border
    def self.included(base)
      base.prop :border
      base.prop :border_top
      base.prop :border_bottom
      base.prop :border_left
      base.prop :border_right
      base.prop :border_x
      base.prop :border_y
    end

    BORDER_VALUES = %w[none default].freeze

    BORDER_PROP_MAP = {
      border: "",
      border_top: "top",
      border_bottom: "bottom",
      border_left: "left",
      border_right: "right",
      border_x: "x",
      border_y: "y",
    }.freeze

    def border_options
      {
        border: "border",
        border_top: "border_top",
        border_bottom: "border_bottom",
        border_left: "border_left",
        border_right: "border_right",
        border_x: "border_x",
        border_y: "border_y",
      }
    end

    def border_values
      BORDER_VALUES
    end

    def border_props
      css = +""
      BORDER_PROP_MAP.each do |prop_name, side|
        value = send(prop_name)
        next unless value
        next unless BORDER_VALUES.include?(value.to_s)

        css << "#{Playbook::Border.border_class_for(side, value)} "
      end
      css.strip unless css.empty?
    end

    class << self
      def border_class_for(side, value)
        v = value.to_s
        return nil unless BORDER_VALUES.include?(v)

        if v == "none"
          return "border_none" if side == ""

          "border_#{side}_none"
        elsif side == ""
          "border_#{v}"
        else
          "border_#{side}_#{v}"
        end
      end

      def border_class_for_prop(prop_name, value)
        side = BORDER_PROP_MAP[prop_name.to_sym]
        return nil unless side

        border_class_for(side, value)
      end
    end
  end
end
