# frozen_string_literal: true

module Playbook
  module PbRichTextEditor
    class RichTextEditor
      include Playbook::Props
      partial "pb_rich_text_editor/rich_text_editor"


      prop :focus, type: Playbook::Props::Boolean,
                   default: false
 
      prop :simple, type: Playbook::Props::Boolean,
                    default: false

      prop :sticky, type: Playbook::Props::Boolean,
                   default: false
      
      prop :value
      prop :template
      prop :placeholder

      def classname
        generate_classname("pb_rich_text_editor_kit", simple_class, focus_class, sticky_class, separator: " ")
      end

      def focus_class
        focus ? "focus-editor-targets" : nil
      end

      def simple_class
        simple ? "simple" : nil
      end

      def sticky_class
        sticky ? "sticky" : nil
      end 

      def rich_text_options
        {
          id: id,
          className: classname,
          focus: focus,
          simple: simple,
          sticky: sticky,
          value: value,
          template: template,
          placeholder: placeholder
        }
      end

    end
  end
end
   