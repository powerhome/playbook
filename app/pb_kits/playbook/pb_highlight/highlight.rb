# frozen_string_literal: true

module Playbook
  module PbHighlight
    class Highlight
      include Playbook::Props

      partial "pb_highlight/highlight"

      prop :text

      def classname
        generate_classname("pb_highlight_kit")
      end

      # def highlight
      #   text.gsub! '<:', '<span class="pb_highlight_kit">'
      #   text.gsub! ':>', '</span>'
      #   return text
      # end

      def highlight
        if text['<:'] && text[':>']
          text.gsub! '<:', ''
          text.gsub! ':>', ''
          return content_tag(:span,text,class:['pb_highlight_kit'])
        else
          return text
        end
      end

    end
  end
end
