# frozen_string_literal: true

module Playbook
  module PbSectionSeparator
    class SectionSeparator
      include Playbook::Props

      partial "pb_section_separator/section_separator"

      prop :text

      def classname
        generate_classname("pb_section_separator_kit")
      end
    end
  end
end
