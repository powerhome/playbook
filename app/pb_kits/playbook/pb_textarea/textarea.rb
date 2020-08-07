# frozen_string_literal: true

module Playbook
  module PbTextarea
    class Textarea
      include Playbook::Props

      partial "pb_textarea/textarea"

      prop :error
      prop :object
      prop :label
      prop :method
      prop :name
      prop :placeholder
      prop :resize, type: Playbook::Props::Enum,
            values: %w[none both horizontal vertical],
            default: "none"
      prop :rows, type: Playbook::Props::Number,
            default: 4
      prop :value

      def classname
        generate_classname("pb_textarea_kit") + error_class + resize_class
      end

    private

      def error_class
        error ? " error" : ""
      end

      def resize_class
        " resize_#{resize}"
      end

    end
  end
end
