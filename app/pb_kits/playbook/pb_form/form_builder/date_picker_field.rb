# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      module DatePickerField
        def date_picker(name, props: {})
          prefix = @object_name
          html_attribute_name = "#{prefix}[#{name}]"
          html_id = "#{prefix}_#{name}"
          props[:label] = @template.label(@object_name, name) if props[:label] && !props[:label].is_a?(String)

          props[:name] = html_attribute_name
          props[:picker_id] = html_id

          @template.pb_rails("date_picker", props: props)
        end
      end
    end
  end
end
