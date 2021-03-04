# frozen_string_literal: true

module Playbook
  module PbBreadCrumbs
    class BreadCrumbs < Playbook::KitBase
      prop :text
      prop :children
      prop :link
      prop :icon
      def classname
        generate_classname("pb_bread_crumbs_kit")
      end

    private

      def rounded_class
        rounded ? "rounded" : nil
      end
    end
  end
end
