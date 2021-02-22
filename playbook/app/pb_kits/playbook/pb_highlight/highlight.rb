# frozen_string_literal: true

module Playbook
  module PbHighlight
    class Highlight < Playbook::KitBase
      prop :text

      def classname
        generate_classname("pb_highlight_kit")
      end
    end
  end
end
