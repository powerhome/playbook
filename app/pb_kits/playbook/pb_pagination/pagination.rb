# frozen_string_literal: true

module Playbook
  module PbPagination
    class Pagination
      include Playbook::Props

      partial "pb_pagination/pagination"

      prop :page_number, type: Playbook::Props::Array, default: []
      prop :active, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_pagination_kit")
      end
    end
  end
end
