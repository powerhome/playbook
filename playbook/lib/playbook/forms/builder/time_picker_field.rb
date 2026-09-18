# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def time_picker(name, props: {})
        props = props.dup
        prefix = @object_name
        html_attribute_name = "#{prefix}[#{name}]"
        html_id = "#{prefix}_#{name}"

        apply_form_error!(props, name)

        unless props.key?(:default_time) || props.key?(:value)
          serialized = serialize_time_picker_default(form_attribute_value(name))
          props[:default_time] = serialized if serialized.present?
        end

        if props[:label] == true
          props[:label] = if @object && @object.class.respond_to?(:human_attribute_name)
                            @object.class.human_attribute_name(name)
                          else
                            name.to_s.humanize
                          end
        end
        props[:label] = "Time Picker" if props[:label].nil?

        props[:name] = html_attribute_name
        props[:id] = html_id

        @template.pb_rails("time_picker", props: props)
      end
    end
  end
end
