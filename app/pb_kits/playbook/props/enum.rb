# frozen_string_literal: true

module Playbook
  module Props
    class Enum < Playbook::Props::Base
      def initialize(values:, **options)
        super(**options)
        @values = values
      end
    end
  end
end
