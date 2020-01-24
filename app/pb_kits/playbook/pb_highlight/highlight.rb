# frozen_string_literal: true

module Playbook
  module PbHighlight
    class Highlight
      include Playbook::Props

      partial "pb_highlight/highlight"
<<<<<<< HEAD

      prop :text

      def classname
        generate_classname("pb_highlight_kit")
      end


=======
>>>>>>> added highlight kit
    end
  end
end
