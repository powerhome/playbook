# frozen_string_literal: true

module Playbook
  module PbCollapsible
    class CollapsibleMain < Playbook::KitBase
      prop :id, type: Playbook::Props::String,
                default: "pb_collapsible_kit"

      def data
        Hash(prop(:data)).merge(collapsible_main: true)
      end

      def classname
        generate_classname("pb_collapsible_main_kit", padding, separator: " ")
      end

      def aria_main
        { label: "Toggle Section Content", role: "button" }.merge! aria
      end
    end
  end
end
