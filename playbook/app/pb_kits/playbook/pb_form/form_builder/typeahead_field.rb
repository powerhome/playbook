# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      module TypeaheadField
        def typeahead(name, _options = {}, _html_options = {}, props: {})
          props[:name] = name
          @template.pb_rails("typeahead", props: props)
        end
      end
    end
  end
end
