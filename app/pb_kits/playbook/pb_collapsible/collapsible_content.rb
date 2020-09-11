# frozen_string_literal: true

module Playbook
  module PbCollapsible
    class CollapsibleContent
      include Playbook::Props

      partial "pb_collapsible/child_kits/collapsible_content"

      def classname
        generate_classname("pb_collapsible_content_kit", padding, separator: " ")
      end
    end
  end
end
