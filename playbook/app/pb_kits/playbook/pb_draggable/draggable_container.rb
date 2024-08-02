# frozen_string_literal: true

module Playbook
  module PbDraggable
    class DraggableContainer < Playbook::KitBase
      prop :container

      def data
        Hash(prop(:data)).merge(
          pb_draggable_container: container.presence || ""
        )
      end

      def classname
        generate_classname("pb_draggable_container")
      end
    end
  end
end
