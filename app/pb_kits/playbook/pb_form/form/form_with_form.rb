# frozen_string_literal: true

module Playbook
  module PbForm
    class Form
      class FormWithForm
        def initialize(form)
          self.form = form
        end

        def to_partial_path
          "pb_form/form_form_with"
        end

        def merged_form_system_options
          Hash(form_system_options).merge(
            class: merged_class,
            builder: form_builder
          )
        end

      private

        attr_accessor :form

        delegate_missing_to :form

        def merged_class
          "pb-form #{Hash(form_system_options)[:class]}".strip
        end

        def form_builder
          FormBuilder::FormWithFormBuilder
        end
      end
    end
  end
end
