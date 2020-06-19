# frozen_string_literal: true

module Playbook
  module PbLayout
    class Body
      include Playbook::Props

      partial "pb_layout/body"

      prop :tag, type: Playbook::Props::Enum,
                 values: %w[ul li span div],
                 default: "div"

      def classname
        generate_classname("layout_body")
      end
    end
  end
end
