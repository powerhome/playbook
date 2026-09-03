# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def dropdown_field(name, props: {})
        props = props.dup
        props[:name] = name
        props[:margin_bottom] = "sm"

        apply_form_error!(props, name)

        unless props.key?(:default_value)
          value = form_attribute_value(name)
          unless value.nil?
            resolved = resolve_dropdown_default(value, props[:options], multi_select: props[:multi_select])
            props[:default_value] = resolved unless resolved.nil?
          end
        end

        if props[:label] == true
          props[:label] = if @object && @object.class.respond_to?(:human_attribute_name)
                            @object.class.human_attribute_name(name)
                          else
                            name.to_s.humanize
                          end
        end
        @template.pb_rails("dropdown", props: props)
      end
    end
  end
end
