# frozen_string_literal: true

module Playbook
  module PbLink
    class Link < ::Playbook::KitBase
      prop :color, type: Playbook::Props::Enum,
                   values: %w[default body muted destructive],
                   default: "default"
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :href
      prop :icon
      prop :icon_right
      prop :tabindex
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[a h1 h2 h3 h4 h5 h6 p span div],
                 default: "a"
      prop :target
      prop :text
      prop :underline, type: Playbook::Props::Boolean,
                       default: false

      def classname
        generate_classname("pb_link_kit", color_class, underline_class, disabled_class)
      end

      def content
        text
      end

      def target_attribute
        target if target && href
      end

    private

      def color_class
        color == "default" ? nil : color
      end

      def disabled_class
        disabled ? "disabled" : nil
      end

      def underline_class
        underline ? "underline" : nil
      end
    end
  end
end
