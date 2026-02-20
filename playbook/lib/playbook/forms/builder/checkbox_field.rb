# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def check_box(name, props: {}, **options)
        label_text = @template.label(@object_name, name) if props[:label] == true
        options[:required] = true if props[:required]
        props[:margin_bottom] = "sm"
        props[:form_spacing] = true

        checked_value = options[:checked_value]
        unchecked_value = options[:unchecked_value]
        options.delete(:checked_value)
        options.delete(:unchecked_value)

        input = super(name, options, checked_value, unchecked_value)

        if props[:label]
          @template.pb_rails("caption", props: { color: "lighter", text: label_text, margin_bottom: "xs" }) +
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
