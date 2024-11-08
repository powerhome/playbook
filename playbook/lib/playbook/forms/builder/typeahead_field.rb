# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def typeahead(name, _options = {}, _html_options = {}, props: {})
        props[:name] = name
        props[:label] = props[:label] == true ? name.to_s.underscore.humanize : props[:label]

        if props.key?(:validation)
          validation = props[:validation]
          props[:input_options] = {
            pattern: validation[:pattern] || "",
            data: { message: validation[:message] || "" },
          }
        end

        @template.pb_rails("typeahead", props: props)
      end
    end
  end
end
