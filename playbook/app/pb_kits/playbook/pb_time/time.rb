# frozen_string_literal: true

module Playbook
  module PbTime
    class Time
      include Playbook::Props

      partial "pb_time/time"

      prop :time, required: true
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md lg],
                  default: "sm"
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :timezone, default: "America/New_York"
      prop :show_icon, type: Playbook::Props::Boolean,
                       default: false
      prop :show_timezone, type: Playbook::Props::Boolean,
                           default: true

      def classname
        # convert deprecated prop values
        mutated_size = size
        mutated_size = "sm" if mutated_size == "xs"
        mutated_size = "md" if mutated_size == "lg"

        generate_classname("pb_time_kit", align, mutated_size)
      end

      def format_time_string
        "#{pb_date_time.to_hour}:#{pb_date_time.to_minutes}#{pb_date_time.to_meridian}"
      end

      def format_timezone_string
        pb_date_time.to_timezone.to_s
      end

      def pb_date_time
        Playbook::PbKit::PbDateTime.new(time, timezone)
      end
    end
  end
end
