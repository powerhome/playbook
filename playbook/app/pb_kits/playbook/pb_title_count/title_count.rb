# frozen_string_literal: true

module Playbook
  module PbTitleCount
    class TitleCount
      include Playbook::Props

      partial "pb_title_count/title_count"

      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg sm],
                  default: "sm"
      prop :title
      prop :count, type: Playbook::Props::Numeric

      def classname
        generate_classname("pb_title_count_kit", align, size)
      end

      def title_size
        size == "lg" ? 3 : 4
      end

      def format_count
        count.to_s.gsub(/(\d)(?=\d{3}+(?:\.|$))(\d{3}\..*)?/, '\1,\2')
      end
    end
  end
end
