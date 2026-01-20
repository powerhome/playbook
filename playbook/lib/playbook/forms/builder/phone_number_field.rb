# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def phone_number_field(name, props: {})
        props[:id] ||= "#{@object_name}_#{name}"
        props[:name] = name

        props[:input_props] ||= {}
        props[:input_props][:id] ||= "#{@object_name}_#{name}"

        if props[:label] == true
          # If using required_indicator, extract just the text and let the template handle rendering
          props[:label] = if props[:required_indicator]
                            if @object && @object.class.respond_to?(:human_attribute_name)
                              @object.class.human_attribute_name(name)
                            else
                              name.to_s.humanize
                            end
                          else
                            # Legacy behavior (generate full label HTML) left untouched
                            @template.label(@object_name, name, for: props[:input_props][:id])
                          end
        elsif props[:label].is_a?(String)
          # If using required_indicator, keep as text; otherwise wrap in label_tag
          props[:label] = @template.label_tag(props[:input_props][:id], props[:label]) unless props[:required_indicator]
        end

        @template.pb_rails("phone_number_input", props: props)
      end
    end
  end
end
