# frozen_string_literal: true

module Playbook
  module PbForm
    class Form
      class SimpleFormForm
        def initialize(form)
          self.form = form
        end

        def to_partial_path
          "pb_form/form_simple_form"
        end

        def merged_form_system_options
          [
            Array(form_system_options)[0],
            Hash(Array(form_system_options)[1]).merge(
              html: merged_html,
              builder: form_builder
            ),
          ]
        end

      private

        attr_accessor :form

        delegate_missing_to :form

        def merged_html
          html_options = Hash(Array(form_system_options)[1])[:html] || {}
          html_class = html_options[:class]
          html_options[:class] = "pb-form #{html_class}".strip

          html_options
        end

        def form_builder
          FormBuilder::SimpleFormBuilder
        end
      end
    end
  end
end
