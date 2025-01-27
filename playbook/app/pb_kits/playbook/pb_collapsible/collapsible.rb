# frozen_string_literal: true

module Playbook
  module PbCollapsible
    class Collapsible < Playbook::KitBase
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p div span tr th td thead col],
                 default: "div"
      def classname
        generate_classname("pb_collapsible_kit")
      end
    end
  end
end
