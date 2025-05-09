# frozen_string_literal: true

module Playbook
  module PbFileUpload
    class FileUpload < Playbook::KitBase
      prop :accept, type: Playbook::Props::String,
                    default: ""

      prop :files, type: Playbook::Props::Array,
                   default: []

      prop :label, type: Playbook::Props::String,
                   default: "Upload File"

      prop :placeholder, type: Playbook::Props::String,
                         default: "No file"

      prop :full_width, type: Playbook::Props::Boolean,
                        default: false

      prop :input_options, type: Playbook::Props::HashProp,
                           default: {}

      prop :error, type: Playbook::Props::String

      def classname
        file_upload_class = generate_classname("pb_file_upload_kit")
        file_upload_class + error_class + full_width_class
      end

      def full_width_class
        full_width ? " full_width" : ""
      end

      def error_class
        error.present? ? "_error" : ""
      end
    end
  end
end
