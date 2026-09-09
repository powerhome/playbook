# frozen_string_literal: true

module Playbook
  module PbContainer
    class Container < ::Playbook::KitBase
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[div span a button option table tbody thead tfoot tr td th img section article main header footer nav aside],
                 default: "div"

      def classname
        generate_classname("pb_container_kit")
      end
    end
  end
end
