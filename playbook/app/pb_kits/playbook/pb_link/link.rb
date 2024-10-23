# frozen_string_literal: true

module Playbook
  module PbLink
    class Link < ::Playbook::KitBase
      prop :color, type: Playbook::Props::Enum,
                   values: %w[default body muted destructive],
                   default: "default"
      prop :href
      prop :status, type: Playbook::Props::Enum,
                    values: %w[neutral positive negative],
                    default: "neutral",
                    deprecated: true
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[a h1 h2 h3 h4 h5 h6 p span div],
                 default: "a"
      prop :text
      prop :highlighting, type: Playbook::Props::Boolean,
                          default: false
      prop :highlighted_text, type: Playbook::Props::Array,
                              default: []

      def classname
        generate_classname("pb_link_kit", color_class, status_class)
      end

      def content
        link_text = super.presence || text
        highlighting ? apply_highlight(link_text) : link_text
      end

    private

      def apply_highlight(text)
        pb_highlight_output = pb_rails("highlight") { "|" }
        highlight_tags = pb_highlight_output.split("|")
        highlight(text, highlighted_text, highlighter: "#{highlight_tags.first.html_safe} \\1 #{highlight_tags.last.html_safe}")
      end

      def color_class
        color == "default" ? nil : color
      end

      def status_class
        status == "neutral" ? nil : status
      end
    end
  end
end
