# frozen_string_literal: true

module Playbook
  module PbTextarea
    class Textarea
      include Playbook::Props

      partial "pb_textarea/textarea"

      prop :error, type: Playbook::Props::Boolean,
                   default: false
      prop :error_message, type: Playbook::Props::String,
                           default: "This field has an error."
      prop :input_id
      prop :label
      prop :name
      prop :value
      prop :resize, type: Playbook::Props::Enum,
                    values: %w[none both horizontal vertical],
                    default: "none"
      prop :rows, type: Playbook::Props::Number,
                  default: 4
      prop :input_options, type: Playbook::Props::Hash,
                           default: {}

      def classname
        generate_classname("pb_textarea_kit", error_class, resize_class, separator: " ")
      end

      def input_id_present
        input_id.present? ? input_id : "pb_textarea_id"
      end

      def additional_input_options
        input_options.merge(
          rows: rows
        )
      end

    private

      def error_class
        error ? "error" : nil
      end

      def resize_class
        "resize_#{resize}"
      end
    end
  end
end
