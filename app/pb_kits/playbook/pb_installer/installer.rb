# frozen_string_literal: true

module Playbook
  module PbInstaller
    class Installer
      include Playbook::Props

      partial "pb_installer/installer"

      prop :link
      prop :project_name

      def classname
        generate_classname("pb_installer_kit")
      end
    end
  end
end
