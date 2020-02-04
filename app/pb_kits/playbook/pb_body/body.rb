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

      def classname
        generate_classname("pb_body_kit", color_class, dark_class, status_class)
      end

      def highlight
        if text['<:'] && text[':>']
          input_string = text
          l_marker = "<:"
          r_marker = ":>"
          highlight_text = input_string[/#{l_marker}(.*?)#{r_marker}/m, 1]
          puts '*' * 50
          puts highlight_text
          puts '*' * 50
          # text.gsub! '<:', ''
          # text.gsub! ':>', ''
          return content_tag(:span,highlight_text,class:['pb_highlight_kit'])
        else
          return text
        end
      end


      def string_between_markers marker1, marker2
        self[/#{Regexp.escape(marker1)}(.*?)#{Regexp.escape(marker2)}/m, 1]
      end
    private


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
