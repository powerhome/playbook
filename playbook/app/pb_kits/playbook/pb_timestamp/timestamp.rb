# frozen_string_literal: true

module Playbook
  module PbTimestamp
    class Timestamp
      include Playbook::Props

      partial "pb_timestamp/timestamp"

      prop :text

      def classname
        generate_classname("pb_timestamp_kit")
      end
    end
  end
end
