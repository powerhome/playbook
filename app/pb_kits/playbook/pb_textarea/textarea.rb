# frozen_string_literal: true

module Playbook
  module PbTextarea
    class Textarea
      include Playbook::Props

      partial "pb_textarea/textarea"

      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :error
      prop :object
      prop :label
      prop :method
      prop :name
      prop :placeholder
      prop :rows, type: Playbook::Props::Number,
            default: 4
      prop :value

      def classname
        generate_classname("pb_textarea_kit", dark_class) + error_class
      end

    private

      def dark_class
        dark ? "dark" : nil
      end

      def error_class
        error ? " error" : ""
      end
    end
  end
end
