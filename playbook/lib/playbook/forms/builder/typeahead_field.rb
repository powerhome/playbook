# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def typeahead(name, _options = {}, _html_options = {}, props: {})
        props[:name] = name
        @template.pb_rails("typeahead", props: props)
      end
    end
  end
end
