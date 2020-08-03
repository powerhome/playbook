# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      module CheckboxField
        # def check_box(name, props: {})
        #   # provides form validation option
        #   required = props[:required].present? ? "required" : ""
        #   input = super(name, "1", false, { required: required })

        #   @template.pb_rails("checkbox", props: props) do
        #     input
        #   end
        # end
        def check_box(name, props: {})
          value = props[:value] ||= 1

          input = super(name, { required: props[:required] }, value)

          @template.pb_rails("checkbox", props: props) do
            input
          end
        end
        # def checkbox(name, _options = {}, _html_options = {}, props: {})
        #   props[:name] = name
        #   @template.pb_rails("checkbox", props: props)
        # end
      end
    end
  end
end
