# frozen_string_literal: true

module Playbook
  module PbLayout
    class Header
      include Playbook::Props

      partial "pb_layout/header"

      prop :tag, type: Playbook::Props::Enum,
                 values: %w[ul li span div],
                 default: "div"

      def classname
        generate_classname("layout_header")
      end
    end
  end
end
