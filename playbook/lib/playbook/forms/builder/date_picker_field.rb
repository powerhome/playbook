# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def date_picker(name, props: {})
        props = props.dup
        prefix = @object_name
        html_attribute_name = "#{prefix}[#{name}]"
        html_id = "#{prefix}_#{name}"

        apply_form_error!(props, name)

        unless props.key?(:default_date)
          serialized = serialize_date_picker_default(form_attribute_value(name))
          props[:default_date] = serialized if serialized.present?
        end

        if props[:label] == true
          props[:label] = if @object && @object.class.respond_to?(:human_attribute_name)
                            @object.class.human_attribute_name(name)
                          else
                            name.to_s.humanize
                          end
        end
        props[:label] = "Date Picker" if props[:label].nil?

        props[:name] = html_attribute_name
        props[:picker_id] = html_id

        # Only forward error when present — `error: nil` would suppress auto-bind
        # inside FormFieldBuilder (`return if props.key?(:error)`).
        input_props = {
          label: nil,
          placeholder: props[:placeholder],
          required: props[:required],
          validation: props[:validation_message].present? ? { message: props[:validation_message] } : {},
        }
        input_props[:error] = props[:error] if props[:error].present?

        input = text_field(
          name,
          autocomplete: "off",
          disabled: props[:disable_input],
          data: props[:input_data],
          aria: props[:input_aria],
          props: input_props
        )

        @template.pb_rails("date_picker", props: props) do
          input
        end
      end
    end
  end
end
