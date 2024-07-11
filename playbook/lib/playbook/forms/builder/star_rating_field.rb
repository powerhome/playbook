# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def star_rating_field(name, props: {})
        props[:name] = name
        props[:margin_bottom] = "sm"
        props[:label] = @template.label(@object_name, name) if props[:label] == true
        @template.pb_rails("star_rating", props: props)
      end
    end
  end
end
