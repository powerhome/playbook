# frozen_string_literal: true

module Playbook
  module PbDialog
    class DialogBody < Playbook::KitBase
      prop :text

      def classname
        generate_classname("dialog_body p_sm")
      end
    end
  end
end
