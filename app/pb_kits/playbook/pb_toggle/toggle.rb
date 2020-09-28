# frozen_string_literal: true

require "action_view"

module Playbook
  module PbToggle
    class Toggle
      include ActionView::Helpers::FormTagHelper
      include ActionView::Context
      include Playbook::Props

      partial "pb_toggle/toggle"

      prop :checked, type: Playbook::Props::Boolean,
                     default: false
      prop :name
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md],
                  default: "sm"
      prop :value

      def classname
        generate_classname("pb_toggle_kit", size, checked_class)
      end

      def input
        check_box_tag(name, value, checked)
      end

    private

      def checked_class
        checked ? "on" : "off"
      end
    end
  end
end
