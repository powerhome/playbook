# frozen_string_literal: true

module Playbook
  module PbFileUpload
    class FileUpload
      include Playbook::Props

      partial "pb_file_upload/file_upload"
    end
  end
end
