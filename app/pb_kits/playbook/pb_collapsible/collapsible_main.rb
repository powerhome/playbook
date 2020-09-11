# frozen_string_literal: true

module Playbook
  module PbCollapsible
    class CollapsibleMain
      include Playbook::Props

      partial "pb_collapsible/child_kits/collapsible_main"

      def classname
        generate_classname("pb_collapsible_main_kit", padding, separator: " ")
      end
    end
  end
end
