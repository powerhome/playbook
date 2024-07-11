# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def star_rating(name, props: {})
        props[:name] = name
        props[:label] = @template.label(@object_name, name) if props[:label] == true
        @template.pb_rails("star_rating_input", props: props)
      end
    end
  end
end
