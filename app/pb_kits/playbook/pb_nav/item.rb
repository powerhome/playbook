# frozen_string_literal: true

module Playbook
  module PbNav
    class Item
      include Playbook::Props

      partial "pb_nav/item"

      prop :active, type: Playbook::Props::Boolean, default: false
      prop :link, default: "#"
      prop :text

      def classname
        generate_classname("pb_nav_list_border_item", active_class)
      end

    private

      def active_class
        active ? "active" : nil
      end
    end
  end
end