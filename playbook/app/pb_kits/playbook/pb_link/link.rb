# frozen_string_literal: true

module Playbook
  module PbLink
    class Link < ::Playbook::KitBase
      prop :color, type: Playbook::Props::Enum,
                   values: %w[default body muted destructive],
                   default: "default"
      prop :href
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[a h1 h2 h3 h4 h5 h6 p span div],
                 default: "a"
      prop :text
      prop :underlined, type: Playbook::Props::Boolean,
                        default: false

      def classname
        generate_classname("pb_link_kit", color_class, underlined_class)
      end

      def content
        text
      end

    private

      def color_class
        color == "default" ? nil : color
      end

      def underlined_class
        underlined ? "underlined" : nil
      end
    end
  end
end
