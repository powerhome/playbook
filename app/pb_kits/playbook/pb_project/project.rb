# frozen_string_literal: true

module Playbook
  module PbProject
    class Project
      include Playbook::Props

      partial "pb_project/project"

      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :project_name
      prop :project_number
      prop :date
      prop :link

      def classname
        generate_classname("pb_project_kit", dark_class)
      end

      def date_element
        "&middot; #{date.strftime('%m/%d')}".html_safe
      end

    private

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
