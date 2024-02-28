# frozen_string_literal: true

module Playbook
  module PbFormGroup
    class FormGroup < Playbook::KitBase
      prop :full_width, type: Playbook::Props::Boolean,
                        default: false

      def classname
        generate_classname("pb_form_group_kit", full_width_class) + form_group_rails
      end

    private

      def full_width_class
        full_width ? "full" : nil
      end

      def form_group_rails
        " rails"
      end
    end
  end
end
