# frozen_string_literal: true

module Playbook
  module PbDraggable
    class DraggableContainer < ::Playbook::KitBase
      prop :container, type: Playbook::Props::String,
                       default: ""

      def data
        Hash(prop(:data)).merge(pb_draggable_container: true)
      end

      def classname
        generate_classname("pb_draggable_container")
      end
    end
  end
end
