# frozen_string_literal: true

module Playbook
  module PbLayout
    class Item < Playbook::KitBase
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg],
                  default: "sm"

      def classname
        generate_classname("layout_item") + size_class
      end

    private

      def size_class
        " size_#{size}"
      end
    end
  end
end
