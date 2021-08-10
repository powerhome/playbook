# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def select(name, choices = nil, options = {}, html_options = {}, props: {}, &block)
        props[:label] = @template.label(@object_name, name) if props[:label] == true
        options[:skip_default_ids] = false unless options.key?(:skip_default_ids)
        options[:prompt] = props[:blank_selection] || ""
        html_options[:required] = "required" if props[:required]
        input = super(name, choices, options, html_options, &block)

        @template.pb_rails("select", props: props) do
          input
        end
      end
    end
  end
end
