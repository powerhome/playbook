# frozen_string_literal: true

module Playbook
  module PbRichTextEditorLexxy
    class RichTextEditorLexxy < Playbook::KitBase
      prop :value
      prop :placeholder
      prop :input_options, type: Playbook::Props::HashProp, default: {}
      prop :label
      prop :required_indicator, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_rich_text_editor_kit", "rte-container")
      end

      def input_id
        input_options[:id].presence || (id.present? ? "#{id}-input" : "rich_text_editor_lexxy-input")
      end

      def input_name
        input_options[:name].presence || "content"
      end

      def container_id
        id.present? ? "rte-lexxy-#{id}" : "rte-lexxy-#{input_id.gsub(/[^a-z0-9_-]/i, '')}"
      end
    end
  end
end
