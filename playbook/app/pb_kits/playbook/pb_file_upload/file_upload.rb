# frozen_string_literal: true

module Playbook
  module PbFileUpload
    class FileUpload < Playbook::KitBase
      prop :accept, type: Playbook::Props::String,
                    default: ""
      prop :files, type: Playbook::Props::Array,
                   default: []

      def classname
        generate_classname("pb_file_upload_kit")
      end
    end
  end
end
