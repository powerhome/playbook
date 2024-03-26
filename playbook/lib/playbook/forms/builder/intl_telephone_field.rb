# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def intl_telephone(name, props: {})
        props[:name] = name
        @template.pb_rails("phone_number_input", props:)
      end
    end
  end
end
