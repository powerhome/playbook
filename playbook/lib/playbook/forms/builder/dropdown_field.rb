# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def dropdown_field(name, props: {})
        props[:name] = name
        @template.pb_rails("dropdown", props: props)
      end
    end
  end
end
