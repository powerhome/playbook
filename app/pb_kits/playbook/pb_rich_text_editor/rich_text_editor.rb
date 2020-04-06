# frozen_string_literal: true

module Playbook
  module PbRichTextEditor
    class RichTextEditor
      include Playbook::Props
      partial "pb_rich_text_editor/rich_text_editor"


      def classname
        generate_classname("pb_rich_text_editor_kit")
      end
    end
  end
end
