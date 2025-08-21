# frozen_string_literal: true

module Playbook
  module PbLayout
    class Sidebar < Playbook::KitBase
      def classname
        generate_classname("layout_sidebar")
      end
    end
  end
end
