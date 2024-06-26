# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def phone_number_field(name, props: {})
        props[:name] = name
        @template.pb_rails("phone_number_input", props: props)
      end
    end
  end
end
