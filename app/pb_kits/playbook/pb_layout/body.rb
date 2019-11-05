# frozen_string_literal: true

module Playbook
  module PbLayout
    class Body
      include Playbook::Props

      partial "pb_layout/body"

      def classname
        generate_classname("layout_body")
      end
    end
  end
end
