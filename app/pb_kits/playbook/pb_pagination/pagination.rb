# frozen_string_literal: true

module Playbook
  module PbPagination
    class Pagination
      include Playbook::Props

      partial "pb_pagination/pagination"

      prop :page_number, type: Playbook::Props::Array, default: []
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[basic collapsed expanded scroll],
                     default: "basic"
      prop :active, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_pagination_kit", variant)
      end
    end
  end
end
