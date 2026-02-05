# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def collection_select(name, collection, value_method, text_method, options = {}, html_options = {}, props: {})
        props[:input_options] ||= {}
        props[:input_options][:id] ||= "#{@object_name}_#{name}"

        if props[:label] == true
          props[:label] = if @object && @object.class.respond_to?(:human_attribute_name)
                            @object.class.human_attribute_name(name)
                          else
                            name.to_s.humanize
                          end
        end

        options[:skip_default_ids] = false unless options.key?(:skip_default_ids)
        options[:prompt] = props[:blank_selection] || ""
        html_options[:required] = "required" if props[:required]
        html_options[:id] = props[:input_options][:id]
        html_options[:class] = props[:input_options][:class] if props[:input_options][:class]
        html_options[:data] = (html_options[:data] || {}).merge(props[:input_options][:data] || {})

        input = super(name, collection, value_method, text_method, options, html_options)

        @template.pb_rails("select", props: props) do
          input
        end
      end
    end
  end
end
