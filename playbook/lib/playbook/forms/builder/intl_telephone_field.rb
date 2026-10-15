# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def intl_telephone(name, props: {})
        props = props.dup
        props[:name] = name.to_s
        props[:id] ||= "#{@object_name}_#{name}"

        apply_form_error!(props, name)

        unless props.key?(:value)
          value = form_attribute_value(name)
          props[:value] = value.to_s if value.present?
        end

        if props[:label] == true
          props[:label] = if @object && @object.class.respond_to?(:human_attribute_name)
                            @object.class.human_attribute_name(name)
                          else
                            name.to_s.humanize
                          end
        end

        @template.pb_rails("phone_number_input", props: props)
      end
    end
  end
end
