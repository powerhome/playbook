# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def dropdown_field(name, props: {})
        props[:name] = name
        props[:margin_bottom] = "sm"
        props[:label] = @template.label(@object_name, name) if props[:label] == true
        @template.pb_rails("dropdown", props: props)
      end
    end
  end
end
