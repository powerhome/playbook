# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def multi_level_select(name, props: {})
        props[:name] = name
        props[:data] ||= {}
        props[:data][:multi_level_select_form] = true
        @template.pb_rails("multi_level_select", props: props)
      end
    end
  end
end
