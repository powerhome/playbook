# frozen_string_literal: true

module Playbook
  module PbSectionSeparator
    class SectionSeparator
      include Playbook::Props

      partial "pb_section_separator/section_separator"

      prop :text
      prop :variant, type: Playbook::Props::Enum,
                 values: %w[card background],
                 default: "card"

      def classname
        generate_classname("pb_section_separator_kit",variant)
      end
    end
  end
end
