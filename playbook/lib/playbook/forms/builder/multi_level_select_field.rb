# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def multi_level_select(name, props: {})
        props = props.dup

        apply_form_error!(props, name)

        unless props.key?(:selected_ids)
          value = form_attribute_value(name)
          props[:selected_ids] = Array(value) if value.present?
        end

        if props[:label] == true
          props[:label] = if @object && @object.class.respond_to?(:human_attribute_name)
                            @object.class.human_attribute_name(name)
                          else
                            name.to_s.humanize
                          end
        end

        props[:name] = name
        props[:data] ||= {}
        props[:data][:multi_level_select_form] = true
        @template.pb_rails("multi_level_select", props: props)
      end
    end
  end
end
