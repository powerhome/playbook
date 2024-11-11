# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def typeahead(name, _options = {}, _html_options = {}, props: {})
        # props[:name] = name
        # props[:label] = props[:label] == true ? name.to_s.underscore.humanize : props[:label]
        # props[:label] = @template.label(@object_name, name) if props[:label] == true
        props[:name] = name

        input_id = "#{name}_input"
        props[:input_options] ||= {}
        props[:input_options][:id] ||= input_id

        # if props[:label].nil? || props[:label] == true
        #   props[:label] = @template.label(@object_name, name, for: input_id)
        # end
        # props[:label] = @template.label(@object_name, name, for: input_id) if props[:label] == true
        props[:label] = @template.label(@object_name, name, for: props[:input_options][:id]) if props[:label] == true

        if props.key?(:validation)
          # validation = props[:validation]
          # props[:input_options] = {
          #   pattern: validation[:pattern] || "",
          #   data: { message: validation[:message] || "" },
          # }
          validation = props[:validation]
          props[:input_options] ||= {}
          props[:input_options][:pattern] = validation[:pattern] || ""
          props[:input_options][:data] ||= {}
          props[:input_options][:data][:message] = validation[:message] || ""
          # validation = props[:validation]
          # props[:input_options] = {
          #   pattern: validation[:pattern] || "",
          #   data: { message: validation[:message] || "" },
          #   required: props[:required]
          # }
        end

        @template.pb_rails("typeahead", props: props)
      end
    end
  end
end
