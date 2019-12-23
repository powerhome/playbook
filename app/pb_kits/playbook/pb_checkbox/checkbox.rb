# frozen_string_literal: true

module Playbook
  module PbCheckbox
    class Checkbox
      include Playbook::Props
      include ActionView::Helpers::FormTagHelper
      include ActionView::Context



      partial "pb_checkbox/checkbox"

      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :checked, type: Playbook::Props::Boolean, default: false
      prop :text
      prop :value
      prop :name

      def checked_html
        checked ? "checked='true'" : nil
      end

      def classname
        generate_classname("pb_checkbox_kit", dark_class, checked_class)
      end

      def input
        check_box_tag(name, value, checked)
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
