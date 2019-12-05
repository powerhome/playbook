# frozen_string_literal: true

if defined?(SimpleForm)
  module Playbook
    module PbForm
      module FormBuilder
        class SimpleFormBuilder < SimpleForm::FormBuilder
          include FormBuilder

          def input(attribute_name, options = {}, &block)
            super(
              attribute_name,
              options.merge(label: false, input_html: {
                              props: {
                                label: true,
                              },
                            }),
              &block
            )
          end
        end
      end
    end
  end
end
