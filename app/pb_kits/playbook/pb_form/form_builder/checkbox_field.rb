# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      module CheckboxField
        def check_box(name, props: {}, **options, &block)
          label_text = @template.label(@object_name, name) if props[:label] == true
          options = Hash(options)

          options[:required] = true if props[:required]
          options[:value] = props[:value] ||= 1
          puts options

          input = super(name, **options, &block)
          puts input

          props[:margin_bottom] = "sm"
          props[:form_spacing] = true

          if props[:label]
            @template.pb_rails("caption", props: { text: label_text, margin_bottom: "xs" }) +
              @template.pb_rails("checkbox", props: props) do
                input
              end
          else
            @template.pb_rails("checkbox", props: props) do
              input
            end
          end
        end
      end
    end
  end
end
