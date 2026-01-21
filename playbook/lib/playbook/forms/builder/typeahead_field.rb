# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def typeahead(name, _options = {}, _html_options = {}, props: {})
        props[:name] = name

        input_id = "#{name}_input"
        props[:input_options] ||= {}
        props[:input_options][:id] ||= input_id

        props[:label] = @template.label(@object_name, name, for: props[:input_options][:id]) if props[:label] == true

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
