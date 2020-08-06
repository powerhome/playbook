# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      module CheckboxField
        def check_box(name, props: {})
          value = props[:value] ||= 1
          input = super(name, { required: props[:required] }, value)
          label_text = name.to_s.gsub("_", " ")

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
