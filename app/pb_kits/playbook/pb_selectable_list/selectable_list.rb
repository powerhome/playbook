# frozen_string_literal: true

module Playbook
  module PbSelectableList
    class SelectableList
      include Playbook::Props

      partial "pb_selectable_list/selectable_list"

      def classname
        generate_classname("pb_selectable_list_kit")
      end
    end
  end
end
