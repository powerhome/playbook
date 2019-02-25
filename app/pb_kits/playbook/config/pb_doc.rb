include Playbook::RedcarpetHelper
include ActionView::Helpers::OutputSafetyHelper

module Playbook
  module Config
    class PbDoc

      def initialize(props: default_configuration,
                   name: default_configuration,
                   nested: default_configuration,
                   type: default_configuration,
                   doc_children: default_configuration)
        self.configured_props = props
        self.configured_name = name
        self.configured_nested = nested
        self.configured_type = type
        self.configured_doc_children = doc_children
      end

      def props
        if configured_props == default_configuration
          "{}"
        else
          configured_props
        end
      end

      def name
        if configured_name == default_configuration
          ""
        else
          configured_name
        end
      end

      def nested
        if configured_nested == default_configuration
          nil
        else
          configured_nested
        end
      end

      def snippet
        if configured_type == "rails"
          if !configured_nested.nil?
            rails_nested_snippet(configured_name, configured_props, configured_nested)
          else
            rails_snippet(configured_name, configured_props)
          end
        else
          reg = react_erb_snippet(configured_name, configured_props)
          jsx = react_jsx_snippet(configured_name, configured_props)
          reg+jsx
        end
      end

      def to_partial_path
        "config/pb_doc"
      end

    private

      def rails_nested_snippet(name, props, nested)
        raw rouge("<%= pb_rails(\"#{name}\", props: #{props.to_json}) do %>\n  #{configured_doc_children.join("\n  ")}\n<% end %>", "erb")
      end

      def rails_snippet(name, props)
        props_display = props === nil ? "" : ", props: #{props.to_json}"
        raw rouge("<%= pb_rails(\"#{name}\"#{props_display}) %>", "erb")
      end

      def react_erb_snippet(name, props)
        props_display = props === nil ? "" : ", props: #{props.to_json}"
        raw rouge("<%= pb_react(\"#{name}\"#{props_display}) %>", "erb")
      end

      def react_jsx_snippet(name, props)
        if( !props.nil? && !props.empty? )
          output = ""
          props.each do |key, value|
            output += "#{key}=\"#{value}\" "
          end
          component_props = output
        else
          component_props = ""
        end
        raw rouge("<#{name.camelize} #{component_props} />", "html")
      end

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor :configured_props,
          :configured_name,
          :configured_nested,
          :configured_type,
          :configured_doc_children
    end
  end
end
