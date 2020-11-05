# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      class ActionArea
        def initialize(form_builder)
          self.form_builder = form_builder
        end

        def submit(value = nil, props: {})
          props[:type] ||= "submit"
          button(value, props: props)
        end

        def button(value = nil, props:)
          props[:text] ||= value || form_builder.send(:submit_default_value)

          template.content_tag(:li) do
            template.pb_rails("button", props: props)
          end
        end

        def wrapper
          template.content_tag(:ol, class: "pb-form-actions") do
            yield self
          end
        end

      private

        attr_accessor :form_builder

        def template
          form_builder.instance_variable_get("@template")
        end
      end
    end
  end
end
