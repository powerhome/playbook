# frozen_string_literal: true

module Playbook
  module PbSectionSeparator
    class SectionSeparator < Playbook::KitBase
      prop :color, type: Playbook::Props::Enum,
                   values: %w[default primary],
                   default: "default"
      prop :text
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[card background],
                     default: "card"
      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[horizontal vertical],
                         default: "horizontal"
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :line_style, type: Playbook::Props::Enum,
                        values: %w[dashed solid],
                        default: "solid"

      def classname
        class_names = ["pb_section_separator_kit"]
        class_names << "pb_section_separator_#{variant}"
        class_names << "pb_section_separator_#{orientation}"
        class_names << "pb_section_separator_#{line_style}"
        class_names << "pb_section_separator_color_#{color}"

        generate_classname(class_names.join(" "), separator: " ")
      end

    private

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
