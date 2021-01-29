# frozen_string_literal: true

module Playbook
  module PbLayout
    class Item
      include Playbook::Props

      partial "pb_layout/item"

      prop :span, type: Playbook::Props::Enum,
                  values: %w[one two three],
                  default: "one"

      def classname
        generate_classname("layout_item") + span_class
      end

    private

      def span_class
        " span_#{span}"
      end
    end
  end
end
