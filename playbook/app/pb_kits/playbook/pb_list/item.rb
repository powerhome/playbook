# frozen_string_literal: true

module Playbook
  module PbList
    class Item < Playbook::KitBase
      prop :tabindex

      def classname
        generate_classname("pb_item_kit")
      end
    end
  end
end
