# frozen_string_literal: true

module Playbook
  module PbCollapsible
    class CollapsibleMain < Playbook::KitBase
      def data
        Hash(prop(:data)).merge(collapsible_main: true)
      end

      def classname
        generate_classname("pb_collapsible_main_kit", padding, separator: " ")
      end
    end
  end
end
