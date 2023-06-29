# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def multi_level_select(name, props: {})
        props[:name] = name
        @template.pb_rails("multi_level_select", props: props)
      end
    end
  end
end
