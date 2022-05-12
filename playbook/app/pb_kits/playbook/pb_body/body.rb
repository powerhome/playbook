# frozen_string_literal: true

module Playbook
  module PbBody
    class Body < Playbook::KitBase
      prop :color, type: Playbook::Props::Enum,
                   values: %w[default light lighter link],
                   default: "default"
      prop :status, type: Playbook::Props::Enum,
                    values: %w[neutral success error],
                    default: "neutral"
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p span div],
                 default: "div"
      prop :text
      prop :highlighting, type: Playbook::Props::Boolean,
                          default: false
      prop :highlighted_text, type: Playbook::Props::Array,
                              default: []

      def classname
        generate_classname("pb_body_kit", color_class, status_class)
      end

      def content
        body_text = super.presence || text
        highlighting ? apply_highlight(body_text) : body_text
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
