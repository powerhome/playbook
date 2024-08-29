# frozen_string_literal: true

module Playbook
  module PbCheckbox
    class Checkbox < Playbook::KitBase
      prop :error, type: Playbook::Props::Boolean, default: false
      prop :checked, type: Playbook::Props::Boolean, default: false
      prop :indeterminate, type: Playbook::Props::Boolean, default: false
      prop :text
      prop :value
      prop :name
      prop :disabled, type: Playbook::Props::Boolean, default: false

      prop :input_options, type: Playbook::Props::HashProp,
                           default: {}
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :form_spacing, type: Playbook::Props::Boolean,
                          default: false

      def checked_html
        checked ? "checked='true'" : nil
      end

      def classname
        generate_classname("pb_checkbox_kit", checked_class) + indeterminate_class + error_class
      end

      def input
        input_html = check_box_tag(name, value, checked, input_options.merge(disabled: disabled))
        indeterminate ? input_html + indeterminate_js_script : input_html
      end

      def indeterminate_js_script
        "<script>
          document.addEventListener('DOMContentLoaded', function() {
            var checkbox = document.querySelector('input[name=\"#{name}\"]');
            if (checkbox) {
              checkbox.indeterminate = #{indeterminate};
            }
          });
        </script>".html_safe
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

      def indeterminate_class
        indeterminate ? " indeterminate" : ""
      end
    end
  end
end
