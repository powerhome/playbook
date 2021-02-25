# frozen_string_literal: true

module Playbook
  module PbCollapsible
    class Collapsible < Playbook::KitBase
      def classname
        generate_classname("pb_collapsible_kit")
      end
    end
  end
end
