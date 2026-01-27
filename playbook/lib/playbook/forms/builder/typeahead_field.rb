# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def typeahead(name, _options = {}, _html_options = {}, props: {})
        props[:name] = name

        input_id = "#{name}_input"
        props[:input_options] ||= {}
        props[:input_options][:id] ||= input_id

        # Determine if this will use React rendering
        # React is used when: pills || !is_multi || wrapped || input_display == "none"
        will_use_react = props[:pills] || props[:is_multi] == false || props[:wrapped] || props[:input_display] == "none"

        if props[:label] == true
          # Extract just the text for label
          props[:label] = if @object && @object.class.respond_to?(:human_attribute_name)
                            @object.class.human_attribute_name(name)
                          else
                            name.to_s.humanize
                          end
        elsif props[:label].is_a?(String) && !will_use_react && !props[:required_indicator]
          # Only Rails (non-React) text_input without required_indicator: text_input creates its own label, so keep as plain text
        end
        # Keep label as plain text for both React and Rails (they handle their own label rendering)

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
