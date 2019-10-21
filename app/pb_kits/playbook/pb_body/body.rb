# frozen_string_literal: true

module Playbook
  module PbBody
    class Body
      include Playbook::Props

      partial "pb_body/body"

      prop :color, type: Playbook::Props::Enum,
                   values: %w[default light lighter dark light_dark lighter_dark],
                   default: "default"
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :status, type: Playbook::Props::Enum,
                    values: %w[neutral negative positive],
                    default: "neutral"
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p span div],
                 default: "div"
      prop :text

      def classname
        generate_classname("pb_caption_kit", color_class, dark_class, status_class)
      end

      def color_class
        color != "default" ? color : nil
      end

      def dark_class
        dark ? "dark" : nil
      end

      def status_class
        status != "neutral" ? status : nil
      end

      def yield_children
        !children.nil? ? capture(&children) : text
      end
    end
  end
end
