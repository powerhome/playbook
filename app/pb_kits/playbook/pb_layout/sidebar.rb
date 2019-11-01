# frozen_string_literal: true

module Playbook
  module PbLayout
    class Sidebar
      include Playbook::Props

      partial "pb_layout/sidebar"

      def classname
        generate_classname("layout_sidebar")
      end

      def yield(context:)
        context.capture(&children)
      end
    end
  end
end
