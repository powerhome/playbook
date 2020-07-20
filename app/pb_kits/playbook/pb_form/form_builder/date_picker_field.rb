# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      module DatePickerField
        def date_picker(name, props: {})
          props[:name] = name
          @template.pb_rails("date_picker", props: props)
        end
      end
    end
  end
end
