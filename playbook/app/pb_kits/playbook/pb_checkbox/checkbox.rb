# frozen_string_literal: true

module Playbook
  module PbCheckbox
    class Checkbox
      include Playbook::Props
      include ActionView::Helpers::FormTagHelper
      include ActionView::Context

      partial "pb_checkbox/checkbox"

      prop :error, type: Playbook::Props::Boolean, default: false
      prop :checked, type: Playbook::Props::Boolean, default: false
      prop :text
      prop :value
      prop :name

      prop :input_options, type: Playbook::Props::Hash,
                           default: {}
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :form_spacing, type: Playbook::Props::Boolean,
                          default: false

      def checked_html
        checked ? "checked='true'" : nil
      end

      def classname
        generate_classname("pb_checkbox_kit", checked_class) + error_class
      end

      def input
        check_box_tag(name, value, checked, input_options)
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
    end
  end
end
