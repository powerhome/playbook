# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      module DatePickerField
        # def date_field(name, props: {})
        #   # props[:name] = name

        #   input = super(name)

        #   @template.pb_rails("date_picker", props: props) do
        #     input
        #   end
        # end
        def date_picker(name, props: {})
          props[:name] = name

          @template.pb_rails("date_picker", props: props)
        end
      end
    end
  end
end
