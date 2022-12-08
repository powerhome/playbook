# frozen_string_literal: true

module Playbook
  module PbDialog
    class DialogHeader < Playbook::KitBase
      prop :title

      def classname
        generate_classname("dialog_header")
      end
    end
  end
end
