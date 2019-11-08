# frozen_string_literal: true

module Playbook
  module PbNav
    class Nav
      include ActionView::Helpers::TagHelper
      include Playbook::Props

      partial "pb_nav/nav"

      prop :link, default: "#"
      prop :title
      prop :orientation, type: Playbook::Props::Enum,
                    values: ["vertical", "horizontal"],
                    default: "vertical"

      def classname
        [
          "pb_nav_list",
          orientation
        ].compact.join("_")
      end


    end
  end
end
