# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def star_rating_field(name, props: {})
        props = props.dup
        props[:name] = name
        props[:margin_bottom] = "sm"
        props[:label] = @template.label(@object_name, name) if props[:label] == true

        unless props.key?(:default_value) || props.key?(:rating)
          value = form_attribute_value(name)
          props[:default_value] = value unless value.nil?
        end

        @template.pb_rails("star_rating", props: props)
      end
    end
  end
end
