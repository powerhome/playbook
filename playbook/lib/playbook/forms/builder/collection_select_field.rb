# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def collection_select(name, collection, value_method, text_method, options = {}, html_options = {}, props: {})
        props[:label] = @template.label(@object_name, name) if props[:label] == true
        options[:skip_default_ids] = false unless options.key?(:skip_default_ids)
        options[:prompt] = props[:blank_selection] || ""
        html_options[:required] = "required" if props[:required]
        input = super(name, collection, value_method, text_method, options, html_options)

        @template.pb_rails("select", props: props) do
          input
        end
      end
    end
  end
end
