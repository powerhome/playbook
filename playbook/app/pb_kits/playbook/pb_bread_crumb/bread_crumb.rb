# frozen_string_literal: true

module Playbook
  module PbBreadCrumb
    class BreadCrumb < Playbook::KitBase
      prop :text
      def classname
        generate_classname("pb_bread_crumb_kit")
      end

    private

      def rounded_class
        rounded ? "rounded" : nil
      end
    end
  end
end
