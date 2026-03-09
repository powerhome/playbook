# frozen_string_literal: true

module Playbook
  module PbRichTextEditorTiptap
    class RichTextEditorTiptap < Playbook::KitBase
      prop :value
      prop :placeholder
      prop :input_options, type: Playbook::Props::HashProp, default: {}
      prop :label
      prop :required_indicator, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_rich_text_editor_kit", "rte-container")
      end

      def input_id
        input_options[:id].presence || (id.present? ? "#{id}-input" : "rich_text_editor_tiptap-input")
      end

      def input_name
        input_options[:name].presence || "content"
      end

      def initial_html
        raw = value.present? ? value.to_s.strip : ""
        return "<p></p>" if raw.blank?

        raw.start_with?("<") ? raw : "<p>#{raw}</p>"
      end

      def container_id
        id.present? ? "rte-tiptap-#{id}" : "rte-tiptap-#{input_id.gsub(/[^a-z0-9_-]/i, '')}"
      end

      def editor_node_id
        "#{container_id}-editor"
      end

      def toolbar_id
        "#{container_id}-toolbar"
      end
    end
  end
end
