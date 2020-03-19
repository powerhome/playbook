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
      def classname
        generate_classname("pb_project")
      end
    end
  end
end
