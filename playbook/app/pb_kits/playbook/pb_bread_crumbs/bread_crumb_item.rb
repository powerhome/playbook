# frozen_string_literal: true

module Playbook
  module PbBreadCrumbs
    class BreadCrumbItem < Playbook::KitBase
      prop :link, type: Playbook::Props::String
      def classname
        generate_classname("pb_bread_crumb_item_kit")
      end
    end
  end
end
