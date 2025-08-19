# frozen_string_literal: true

module Playbook
  module PbLayout
    class Footer < Playbook::KitBase
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[ul li span div],
                 default: "div"

      def classname
        "layout_footer"
      end
    end
  end
end
