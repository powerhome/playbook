# frozen_string_literal: true

module Playbook
  module PbTitle
    class Title < Playbook::KitBase
      prop :color, type: Playbook::Props::Enum,
                   values: [nil, "default", "light", "lighter", "success", "error", "link"],
                   default: nil
      prop :size, default: 3
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p div span],
                 default: "h3"
      prop :text
      prop :variant, type: Playbook::Props::Enum,
                     values: [nil, "link"],
                     default: nil,
                     deprecated: true
      prop :bold, type: Playbook::Props::Boolean, default: true
      prop :display_size, default: nil

      def classname
        if is_size_responsive
          generate_classname("pb_title_kit", variant, color, is_bold) + generate_responsive_size_classname
        else
          generate_classname("pb_title_kit", size, variant, color, is_bold) + generate_display_size
        end
      end

      def is_bold
        bold ? nil : "thin"
      end

      def generate_display_size
        return "" if display_size.nil?

        " pb_title_kit_dynamic_#{display_size}"
      end

      def is_size_responsive
        try(:size).is_a?(::Hash)
      end

      def generate_responsive_size_classname
        css = ""
        if is_size_responsive
          size.each do |key, value|
            css += " pb_title_kit_#{key}_#{value}"
          end
        end

        css unless css.blank?
      end
    end
  end
end
