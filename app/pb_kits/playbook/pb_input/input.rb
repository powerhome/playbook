# frozen_string_literal: true

module Playbook
  module PbInput
    class Input
      include Playbook::Props

      partial "pb_input/input"

        PROPS = %i[
                   configured_name
                   configured_label
                   configured_placeholder
                   configured_type
                   configured_value].freeze

        def label
          if configured_label == default_configuration
            ""
          else
            configured_label
          end
        end

        def name
          if configured_name == default_configuration
            ""
          else
            configured_name
          end
        end

        def placeholder
          if configured_placeholder == default_configuration
            ""
          else
            configured_placeholder
          end
        end

        def type
          if configured_type == default_configuration
            "text"
          else
            configured_type
          end
        end

        def value
          if configured_value == default_configuration
            ""
          else
            configured_value
          end
        end

        def to_partial_path
          "pb_input/input"
        end
      end
    end
  end
end
