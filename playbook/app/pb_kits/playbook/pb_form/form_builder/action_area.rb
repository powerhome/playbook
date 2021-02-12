# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      class ActionArea < Playbook::KitBase
        prop :submit_default_value, type: Playbook::Props::String

        def submit(value = nil, props: {})
          props[:type] ||= "submit"
          button(value, props: props)
        end

        def button(value = nil, props:)
          props[:text] ||= value || submit_default_value

          capture do
            content_tag(:li) do
              pb_rails("button", props: props)
            end
          end
        end
      end
    end
  end
end
