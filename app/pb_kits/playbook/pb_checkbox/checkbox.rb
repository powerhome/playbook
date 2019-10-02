# frozen_string_literal: true

module Playbook
  module PbCheckbox
    class Checkbox
      include Playbook::Props

      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :checked, type: Playbook::Props::Boolean, default: false
      prop :icon, type: Playbook::Props::Boolean, default: false
      prop :text, default: ""
      prop :value, default: ""
      prop :name, default: ""

      def to_partial_path
        "pb_checkbox/checkbox"
      end

      def checked_html
        checked ? "checked='true'" : nil
      end

      def classname
        [
          [
            "pb_checkbox_kit",
            dark_class,
            checked_class,
          ].compact.join("_"),
          prop(:classname),
        ].compact.join(" ")
      end

    private

      def checked_class
        checked ? "on" : "off"
      end

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
