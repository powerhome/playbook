# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      class FormFieldBuilder < Module
        def initialize(method_name, kit_name:)
          define_method method_name do |name, props: {}, **options, &block|
            props[:label] = @template.label(@object_name, name) if props[:label] == true
            options = Hash(options)

            options[:skip_default_ids] = false unless options.key?(:skip_default_ids)
            options[:required] = true if props[:required]
            options[:placeholder] = props[:placeholder] || ""
            options[:type] = props[:type] if props.key?(:type)
            options[:value] = props[:value] if props.key?(:value)
            options[:disabled] = true if props.key?(:disabled)
            if props.key?(:disabled)
              cursor_style = props[:disabled] ? "not-allowed" : "pointer"
              existing_style = options[:style] || ""

              options[:style] =
                existing_style.empty? ? "cursor: #{cursor_style}" : "#{existing_style}; cursor: #{cursor_style}"
            end
            if props.key?(:autocomplete)
              options[:autocomplete] = props[:autocomplete] == true ? nil : (props[:autocomplete].presence || "off")
            end

            if props.key?(:validation)
              validation = props[:validation]
              options[:pattern] = validation[:pattern] if validation[:pattern].present?
              options[:data] = { message: validation[:message] } if validation[:message].present?
            end

            input = super(name, **options, &block)

            @template.pb_rails(kit_name, props: props) do
              input
            end
          end
        end
      end
    end
  end
end
