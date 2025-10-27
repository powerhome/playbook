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
      prop :template
      prop :placeholder
      prop :input_options

      prop :rails_advanced_editor, type: Playbook::Props::Boolean,
                                   default: false
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
          id: id,
          inline: inline,
          className: classname,
          focus: focus,
          simple: simple,
          sticky: sticky,
          toolbarBottom: toolbar_bottom,
          value: value,
          template: template,
          placeholder: placeholder,
          inputOptions: input_options,
        }
      end

      def is_rails_advanced?
        rails_advanced_editor
      end

      def rich_text_advanced_options
        {
          id: id,
          inline: inline,
          className: classname,
          focus: focus,
          simple: simple,
          sticky: sticky,
          toolbarBottom: toolbar_bottom,
          value: value || "",
          template: template,
          placeholder: placeholder,
          inputOptions: input_options,
          railsAdvancedEditor: rails_advanced_editor,
          advancedEditorToolbar: advanced_editor_toolbar,
          extensions: extensions,
          maxWidth: max_width,
        }
      end
    end
  end
end
