# frozen_string_literal: true

module Playbook
  module PbTitleDetail
    class TitleDetail
      include Playbook::Props

      partial "pb_title_detail/title_detail"

      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :detail
      prop :title

      def classname
        generate_classname("pb_title_detail_kit", align)
      end
    end
  end
end
