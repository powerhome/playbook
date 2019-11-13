# frozen_string_literal: true

module Playbook
  module PbList
    class Item
      include Playbook::Props

      partial "pb_list/item"

      def classname
        generate_classname("pb_item_kit")
      end
    end
  end
end
