# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def select(name, choices = nil, options = {}, html_options = {}, props: {}, &block)
        props[:input_options] ||= {}
        props[:input_options][:id] ||= "#{@object_name}_#{name}"

        props[:label] = @template.label(@object_name, name, for: props[:input_options][:id]) if props[:label] == true

        options[:skip_default_ids] = false unless options.key?(:skip_default_ids)
        options[:prompt] = props[:blank_selection] || ""
        html_options[:required] = "required" if props[:required]
        html_options[:id] = props[:input_options][:id]
        html_options[:class] = props[:input_options][:class] if props[:input_options][:class]
        html_options[:data] = (html_options[:data] || {}).merge(props[:input_options][:data] || {})

        input = super(name, choices, options, html_options, &block)

        @template.pb_rails("select", props: props) do
          input
        end
      end
    end
  end
end
