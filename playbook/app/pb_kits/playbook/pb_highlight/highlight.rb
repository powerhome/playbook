# frozen_string_literal: true

module Playbook
  module PbHighlight
    class Highlight < Playbook::KitBase
      prop :background_color, default: "yellow"
      prop :text
      prop :text_color, default: "black"

      def classname
        generate_classname("pb_highlight_kit", background_classname, text_color_classname, separator: " ")
      end

      def background_classname
        "highlight_bg_color_#{background_color}"
      end

      def text_color_classname
        "highlight_text_color_#{text_color}"
      end
    end
  end
end
