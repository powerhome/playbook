# frozen_string_literal: true

module Playbook
  module PbVerticalNav
    class VerticalNav
      include ActionView::Helpers::TagHelper
      include Playbook::Props

      partial "pb_vertical_nav/vertical_nav"

      prop :link, default: "#"
      prop :title

      def classname
        generate_classname("vertical_nav_list")
      end
    end
  end
end
