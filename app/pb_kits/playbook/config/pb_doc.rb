include Playbook::RedcarpetHelper
include ActionView::Helpers::OutputSafetyHelper

module Playbook
  module Config
    class PbDoc
      def initialize(props: default_configuration,
                   name: default_configuration,
                   nested: default_configuration,
                   type: default_configuration,
                   available_props: default_configuration)
        self.configured_props = props
        self.configured_name = name
        self.configured_nested = nested
        self.configured_type = type
        self.configured_avail_props = available_props
      end

      def props
        if configured_props == default_configuration
          {}
        else
          configured_props
        end
      end

      def available_props
        if configured_avail_props == default_configuration
          configured_props
        else
          avail_props = Hash[configured_avail_props.map {|v| [v.to_sym, ""]}]
          configured_props.each do |key, set_prop|
            avail_props[key] = set_prop
          end
          avail_props[:block] = true if !configured_nested.nil?
          avail_props = Hash[ avail_props.sort_by { |key, val| key } ]
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
          rails_snippet(configured_name, configured_props, configured_nested)
        else
          react_jsx_snippet(configured_name, configured_props)
        end
      end

      def to_partial_path
        "config/pb_doc"
      end

    private

      def rails_snippet(name, props, nested)
        props_display = props === nil ? "" : ", props: #{pretty_props(props)}"
        snip = "pb_rails(\"#{name}\"#{props_display})"
        if defined?(nested) && !nested.nil?
          if URI(File.dirname(nested.source_location[0])).path.split('/').last == "docs"
            contents = File.read(nested.source_location[0])
            remove_string = ", docs: true"
            raw rouge(contents.gsub(remove_string, "").gsub(remove_string.delete(" "), ""), "erb")
          else
            raw rouge("<%= #{snip} do %>\n  ...\n<% end %>", "erb")
          end
        else
          raw rouge("<%= #{snip} %>", "erb")
        end
      end

      def react_erb_snippet(name, props)
        props_display = props === nil ? "" : ", props: #{pretty_props(props)}"
        raw rouge("<%= pb_react(\"#{name}\"#{props_display}) %>", "erb")
      end

      def react_jsx_snippet(name, props)
        component_props = ""
        if( !props.nil? && !props.empty? )
          output = ""
          props.each { |k,v|  output += "#{k}=\"#{v}\" " }
          component_props = output
        end
        raw rouge("<#{name.camelize} #{component_props}/>", "html")
      end

      def pretty_props(props)
        pretty_props = []
        props.each { |k,v| pretty_props << "#{k}: \"#{v}\"" }
        pretty_props = "{#{pretty_props.join(", ")}}"
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
          :configured_avail_props
    end
  end
end
