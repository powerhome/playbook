# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def dropdown_field(name, props: {})
        props[:name] = name
        props[:margin_bottom] = "sm"
        if props[:label] == true
          props[:label] = if @object && @object.class.respond_to?(:human_attribute_name)
                            @object.class.human_attribute_name(name)
                          else
                            name.to_s.humanize
                          end
        end
        @template.pb_rails("dropdown", props: props)
      end
    end
  end
end
