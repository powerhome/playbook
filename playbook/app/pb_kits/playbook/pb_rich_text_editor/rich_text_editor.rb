# frozen_string_literal: true

module Playbook
  module PbRichTextEditor
    class RichTextEditor < Playbook::KitBase
      prop :focus, type: Playbook::Props::Boolean,
                   default: false

      prop :inline, type: Playbook::Props::Boolean,
                    default: false

      prop :simple, type: Playbook::Props::Boolean,
                    default: false

      prop :sticky, type: Playbook::Props::Boolean,
                    default: false
      prop :toolbar_bottom, type: Playbook::Props::Boolean,
                            default: false

      prop :value
      prop :placeholder
      prop :input_options
      prop :advanced_editor_toolbar, type: Playbook::Props::Boolean,
                                     default: true
      prop :extensions, type: Playbook::Props::HashArray,
                        default: []
      prop :max_width, type: Playbook::Props::Enum,
                       values: %w[xs sm md lg xl],
                       default: "md"

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
          advancedEditorToolbar: advanced_editor_toolbar,
          className: classname,
          extensions: extensions,
          focus: focus,
          id: id,
          inline: inline,
          inputOptions: input_options,
          maxWidth: max_width,
          placeholder: placeholder,
          railsEditor: true,
          simple: simple,
          sticky: sticky,
          toolbarBottom: toolbar_bottom,
          value: value || "",
        }
      end
    end
  end
end
