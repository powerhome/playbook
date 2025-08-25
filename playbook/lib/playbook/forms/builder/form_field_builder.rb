# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      class FormFieldBuilder < Module
        def initialize(method_name, kit_name:)
          define_method method_name do |name, props: {}, **options, &block|
            props   = props.dup
            options = Hash(options)

            options[:skip_default_ids] = false unless options.key?(:skip_default_ids)
            options[:required] = true if props[:required]
            options[:placeholder] = props[:placeholder] || ""

            if props.key?(:validation)
              validation = props[:validation]
              options[:pattern] = validation[:pattern] if validation[:pattern].present?
              options[:data] = { message: validation[:message] } if validation[:message].present?
            end

            input = super(name, **options, &block)

            input_id = input[/\bid="([^"]+)"/, 1] || "#{@object_name}_#{name}"

            if props[:label] == true
              props[:label] = @template.label(@object_name, name)
            elsif props[:label].is_a?(String)
              props[:label] = @template.label_tag(input_id, props[:label])
            end

            @template.pb_rails(kit_name, props: props) do
              input
            end
          end
        end
      end
    end
  end
end
