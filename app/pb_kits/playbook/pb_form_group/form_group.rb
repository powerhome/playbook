# frozen_string_literal: true

module Playbook
  module PbFormGroup
    class FormGroup
      include Playbook::Props

      partial "pb_form_group/form_group"

      def classname
        generate_classname("pb_form_group_kit")
      end
    end
  end
end
