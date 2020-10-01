# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      module DatePickerField
        def date_picker(name, props: {})
          prefix = @object_name
          html_attribute_name = "#{prefix}[#{name}]"
          html_id = "#{prefix}_#{name}"

          props[:name] = html_attribute_name
          props[:picker_id] = html_id

          # puts text_field_tag("test-name", value = nil, options = { id: html_id })
          # puts text_field_tag(:name)
          puts text_field(name)

          @template.pb_rails("date_picker", props: props) do
          end
        end
      end
    end
  end
end

# Create text input with rails form helper
# pass options to text input

# add hidden, implicit prop identifying it as form helper
# inside dp erb, create conditional if check to leave out text_input kit

# pass that input as a block to @template.pb_rails("date_picker")
# let rails do the magic
