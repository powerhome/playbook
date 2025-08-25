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
      prop :display_size, type: Playbook::Props::Enum,
                          values: [nil, "xs", "sm", "md", "lg", "xl", "xxl"],
                          default: nil

      def classname
        title_classes = ["pb_title_kit"]

        if is_size_responsive
          title_classes << "pb_title_#{variant}" if variant.present?
          title_classes << "pb_title_#{color}" if color.present?
          title_classes << "pb_title_#{is_bold}" if is_bold.present?
          title_classes += generate_responsive_size_classes
        else
          title_classes << "pb_title_#{size}" if size.present?
          title_classes << "pb_title_#{variant}" if variant.present?
          title_classes << "pb_title_#{color}" if color.present?
          title_classes << "pb_title_#{is_bold}" if is_bold.present?
          title_classes += generate_display_size_classes
        end

        generate_classname(title_classes.compact.join(" "), separator: " ")
      end

      def is_bold
        bold ? nil : "thin"
      end

      def generate_display_size_classes
        return [] if display_size.nil?

        ["pb_title_dynamic_#{display_size}"]
      end

      def is_size_responsive
        try(:size).is_a?(::Hash)
      end

      def generate_responsive_size_classes
        classes = []
        if is_size_responsive
          size.each do |key, value|
            classes << "pb_title_#{key}_#{value}"
          end
        end
        classes
      end
    end
  end
end
