# frozen_string_literal: true

module Playbook
  module PbContainer
    class Container < ::Playbook::KitBase
      def classname
        generate_classname("pb_container_kit")
      end
    end
  end
end
