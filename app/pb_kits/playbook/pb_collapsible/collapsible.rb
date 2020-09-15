# frozen_string_literal: true

module Playbook
  module PbCollapsible
    class Collapsible
      include Playbook::Props

      partial "pb_collapsible/collapsible"

      def classname
        generate_classname("pb_collapsible_kit")
      end
    end
  end
end
