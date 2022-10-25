# frozen_string_literal: true

module Playbook
  module PbPagination
    class Pagination < ::Playbook::KitBase
      def classname
        generate_classname("pb_pagination")
      end
    end
  end
end
