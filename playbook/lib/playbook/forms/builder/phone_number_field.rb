# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def phone_number_field(name, props: {})
        props[:name] = name

        if props[:label] == true && props[:required_indicator]
          props[:label] = if @object && @object.class.respond_to?(:human_attribute_name)
                            @object.class.human_attribute_name(name)
                          else
                            name.to_s.humanize
                          end
        end

        @template.pb_rails("phone_number_input", props: props)
      end
    end
  end
end
