# frozen_string_literal: true

module Playbook
  module PbFormGroup
    class FormGroup < Playbook::KitBase
      def classname
        generate_classname("pb_form_group_kit")
      end
    end
  end
end
