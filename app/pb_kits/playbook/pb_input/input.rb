# frozen_string_literal: true

module Playbook
  module PbInput
    class Input
      include Playbook::Props

      partial "pb_input/input"

      prop :label
      prop :name
      prop :placeholder
      prop :value
      prop :type, default: "text"

      def classname
        generate_classname("pb_input_kit")
      end
    end
  end
end
