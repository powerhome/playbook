# frozen_string_literal: true

module Playbook
  module PbBreadCrumbs
    class BreadCrumbs < Playbook::KitBase
      def classname
        generate_classname("pb_bread_crumbs_kit")
      end
    end
  end
end
