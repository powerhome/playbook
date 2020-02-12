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
      prop :enable_highlight, type: Playbook::Props::Boolean,
                              default: false
      prop :highlight_marker

      def classname
        generate_classname("pb_body_kit", color_class, dark_class, status_class)
      end

      def content
        enable_highlight ? highlight : text
      end

    private

      def highlight
        m = highlight_marker != nil ? highlight_marker : ':'
        puts text
        # puts text =~ /(^|\s)#{m}{2}(.+?)#{m}{2}/m
        h_content = text.match(/(^|\s)#{m}{2}(.+?)#{m}{2}/m)
        puts h_content
        pb_highlight = Playbook::PbHighlight::Highlight.new() { h_content }
        text.gsub(/(^|\s)#{m}{2}#{h_content}#{m}{2}/m, pb_highlight.to_s ).html_safe
        
        # text.gsub(/(^|\s)#{m}{2}#{h_content}#{m}{2}/m,pb_highlight ).html_safe
        
        # ApplicationController.renderer.render(partial: pb_highlight, as: :object)
      end

      # def h 
      #   pb_highlight = Playbook::PbHighlight::Highlight.new() { h_content }
      #   ApplicationController.renderer.render(partial: pb_highlight, as: :object)
      # end

      def color_class
        color != "default" ? color : nil
      end

      def dark_class
        dark ? "dark" : nil
      end

      def status_class
        status != "neutral" ? status : nil
      end
    end
  end
end
