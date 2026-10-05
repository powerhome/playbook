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
          serialized = serialize_date_picker_default(
            form_attribute_value(name),
            enable_time: props[:enable_time]
          )
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

        # Forward error when set — including explicit nil so the nested text_field
        # does not re-run apply_form_error! and undo the opt-out.
        input_props = {
          label: nil,
          placeholder: props[:placeholder],
          required: props[:required],
          validation: props[:validation_message].present? ? { message: props[:validation_message] } : {},
        }
        input_props[:error] = props[:error] if props.key?(:error)

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
