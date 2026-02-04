# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def date_picker(name, props: {})
        prefix = @object_name
        html_attribute_name = "#{prefix}[#{name}]"
        html_id = "#{prefix}_#{name}"

        props[:label] = @template.label(@object_name, name) if props[:label] == true
        props[:label] = "Date Picker" if props[:label].nil?

        props[:name] = html_attribute_name
        props[:picker_id] = html_id

        input = text_field(
          name,
          autocomplete: "off",
          disabled: props[:disable_input],
          data: props[:input_data],
          aria: props[:input_aria],
          props: {
            error: props[:error],
            label: props[:hide_label] ? nil : props[:label],
            placeholder: props[:placeholder],
            required: props[:required],
          }
        )

        @template.pb_rails("date_picker", props: props) do
          input
        end
      end
    end
  end
end
