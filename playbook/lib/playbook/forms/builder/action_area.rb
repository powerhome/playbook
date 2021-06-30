# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      class ActionArea
        def initialize(view_context, submit_default_value)
          self.view_context = view_context
          self.submit_default_value = submit_default_value
        end

        def submit(value = nil, props: {})
          props[:type] ||= "submit"
          props[:text] ||= value || submit_default_value

          button(value, props: props)
        end

        def button(_value = nil, props:)
          view_context.content_tag(:li) do
            view_context.pb_rails("button", props: props)
          end
        end

      private

        attr_accessor :view_context, :submit_default_value
      end
    end
  end
end
