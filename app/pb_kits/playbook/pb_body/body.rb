# frozen_string_literal: true

module Playbook
  module PbBody
    class Body
      include Playbook::Props
      include ActionView::Helpers
      
      partial "pb_body/body"

      prop :color, type: Playbook::Props::Enum,
                   values: %w[default light lighter dark light_dark lighter_dark],
                   default: "default"
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :status, type: Playbook::Props::Enum,
                    values: %w[neutral negative positive],
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
        highlighting ? apply_highlight : text
      end

    private

      def apply_highlight
        pb_highlight = Playbook::PbHighlight::Highlight.new() {"|"}
        pb_highlight_output = ApplicationController.renderer.render(partial: pb_highlight, as: :object)
        highlight_tags = pb_highlight_output.split("|")
        highlight(text, highlighted_text, highlighter: "#{highlight_tags.first.html_safe} \\1 #{highlight_tags.last.html_safe}")
      end

      def color_class
        color != "default" ? color : nil
      end

      def dark_class
        dark ? " dark" : ""
      end

      def status_class
        status != "neutral" ? status : nil
      end
    end
  end
end
