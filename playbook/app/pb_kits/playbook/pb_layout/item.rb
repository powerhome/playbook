# frozen_string_literal: true

module Playbook
  module PbLayout
    class Item < Playbook::KitBase
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg],
                  default: "sm"

      def classname
        "layout_item layout_item_size_#{size}"
      end
    end
  end
end
