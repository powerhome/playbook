# frozen_string_literal: true

module Playbook
  module PbRichTextEditor
    # Rails rich text editor: TipTap (vanilla JS), no React. Content syncs to a hidden input for form submission.
    class RichTextEditor < Playbook::KitBase
      EXTENSIONS = %w[underline text_align horizontal_rule image].freeze

      prop :value
      prop :placeholder
      prop :input_options, type: Playbook::Props::HashProp, default: {}
      prop :label
      prop :required_indicator, type: Playbook::Props::Boolean, default: false
      prop :markdown_support, type: Playbook::Props::Boolean, default: false
      prop :extensions, type: Playbook::Props::Array, default: []
      # When true, TipTap toolbar matches React `simple`: Bold + Italic only (no block-style Popover).
      # Use in modals or narrow layouts where the block dropdown misbehaves.
      prop :simple, type: Playbook::Props::Boolean, default: false

      # Match React default (globalProps maxWidth "md").
      def max_width
        v = values[:max_width] || values["max_width"]
        v.nil? || v == "" ? "md" : v
      end

      def classname
        generate_classname("pb_rich_text_editor_kit", "rte-container")
      end

      def input_id
        return input_options[:id].presence if input_options[:id].present?
        return "#{id}-input" if id.present?

        # Unique per kit instance — multiple editors without a kit `id` would otherwise share the same DOM id.
        "rich_text_editor-input-#{object_id}"
      end

      def input_name
        return input_options[:name].presence if input_options[:name].present?
        return "#{id}_content" if id.present?

        # Last-resort default; two editors with neither `id` nor `input_options[:name]` still collide — set one of them.
        "content"
      end

      def initial_html
        raw = value.present? ? value.to_s.strip : ""
        return "<p></p>" if raw.blank?

        raw.start_with?("<") ? raw : "<p>#{raw}</p>"
      end

      def enabled_extensions
        @enabled_extensions ||= begin
          requested = extensions.map(&:to_s)
          unknown = requested - EXTENSIONS
          warn("RichTextEditor ignored unknown extensions: #{unknown.join(', ')}. Allowed values: #{EXTENSIONS.join(', ')}") if unknown.any?
          requested.select { |extension| EXTENSIONS.include?(extension) }.uniq
        end
      end

      def extension_enabled?(extension)
        enabled_extensions.include?(extension)
      end

      def show_extensions_dropdown?
        !simple && enabled_extensions.any?
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

      # Stable DOM ids for TipTap toolbar popover (used in ERB + module script; must be kit methods — not ERB locals).
      def rte_block_style_trigger_id
        "#{toolbar_id}-block-trigger"
      end

      def rte_block_style_tooltip_id
        "#{toolbar_id}-block-tooltip"
      end

      def rte_extensions_trigger_id
        "#{toolbar_id}-extensions-trigger"
      end

      def rte_extensions_tooltip_id
        "#{toolbar_id}-extensions-tooltip"
      end
    end
  end
end
