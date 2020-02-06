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


    end
  end
end
