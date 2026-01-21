# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def typeahead(name, _options = {}, _html_options = {}, props: {})
        props[:name] = name

        input_id = "#{name}_input"
        props[:input_options] ||= {}
        props[:input_options][:id] ||= input_id

        # props[:label] = @template.label(@object_name, name, for: props[:input_options][:id]) if props[:label] == true

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
                            @template.label(@object_name, name, for: props[:input_options][:id])
                          end
        elsif props[:label].is_a?(String)
          # If using required_indicator, keep as text; otherwise wrap in label_tag
          props[:label] = @template.label_tag(props[:input_options][:id], props[:label]) unless props[:required_indicator]
        end

        if props[:validation]
          validation_message = props[:validation][:message]
          props[:input_options][:data] ||= {}
          props[:input_options][:data][:validation_message] = validation_message
        end

        @template.pb_rails("typeahead", props: props)
      end
    end
  end
end
