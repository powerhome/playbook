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
          props[:label] = @template.label(@object_name, name) if props[:label] && !props[:label].is_a?(String)

          input = text_field(
            name,
            props: {
              aria: props[:input_aria],
              autocomplete: false,
              # dark: props[:dark],
              data: props[:input_data],
              disabled: props[:disable_input],
              error: props[:error],
              # id: object.picker_id,
              label: props[:label],
              placeholder: props[:placeholder],
              required: props[:required],
              type: props[:required],
            }
          )
          puts input

          @template.pb_rails("date_picker", props: props) do
            input
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
