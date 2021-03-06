# frozen_string_literal: true

module Playbook
  module PbSectionSeparator
    class SectionSeparator < Playbook::KitBase
      prop :text
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[card background],
                     default: "card"
      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[horizontal vertical],
                         default: "horizontal"
      prop :dark, type: Playbook::Props::Boolean,
                  default: false

      def classname
        generate_classname("pb_section_separator_kit", variant, orientation)
      end

    private

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
