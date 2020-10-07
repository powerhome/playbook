# frozen_string_literal: true

module Playbook
  module PbTextarea
    class Textarea
      include Playbook::Props

      partial "pb_textarea/textarea"

      prop :error
      prop :input_id
      prop :label
      prop :name
      prop :object
      prop :value
      prop :resize, type: Playbook::Props::Enum,
                    values: %w[none both horizontal vertical],
                    default: "none"
      prop :rows, type: Playbook::Props::Number,
                  default: 4
      prop :input_options, type: Playbook::Props::Hash,
                           default: {}

      def classname
        generate_classname("pb_textarea_kit") + error_class + resize_class
      end

      def input_id_present
        input_id.present? ? input_id : "pb_textarea_kit"
      end

      def additional_input_options
        input_options.merge(
          class: classname,
          rows: rows
        )
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
