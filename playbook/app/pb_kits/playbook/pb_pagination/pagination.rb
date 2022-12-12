# frozen_string_literal: true

module Playbook
  module PbPagination
    class Pagination < ::Playbook::KitBase
      prop :data, type: Playbook::Props::Array,
                  default: []
      def page_data
        data.paginate(page: params[:page], per_page: 1)
      end
    end
  end
end
