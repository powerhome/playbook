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

      def classname
        title_class = generate_classname("pb_title_kit", variant, color, is_bold)
        title_class + generate_size_classname
      end

      def is_bold
        bold ? nil : "thin"
      end

      def generate_size_classname
        responsive = try(:size).is_a?(::Hash)
        css = ""
        if responsive
          size.each do |key, value|
            css += " pb_title_kit_#{key}_#{value}"
          end
        else
          css += " pb_title_kit_size_#{size}"
        end

        css unless css.blank?
      end
    end
  end
end
