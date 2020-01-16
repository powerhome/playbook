# frozen_string_literal: true

module Playbook
  module PbCheckbox
    class Checkbox
      include Playbook::Props
      include ActionView::Helpers::FormTagHelper
      include ActionView::Context



      partial "pb_checkbox/checkbox"

      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :error, type: Playbook::Props::Boolean, default: false
      prop :checked, type: Playbook::Props::Boolean, default: false
      prop :text
      prop :value
      prop :name

      def checked_html
        checked ? "checked='true'" : nil
      end

      def classname
        generate_classname("pb_checkbox_kit", dark_class, checked_class) + error_class
      end

      def input
        check_box_tag(name, value, checked)
      end

      def checkbox_label_status
        error ? "negative" : nil
      end

    private

      def error_class
        error ? " error" : ""
      end

      def checked_class
        checked ? "on" : "off"
      end

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
