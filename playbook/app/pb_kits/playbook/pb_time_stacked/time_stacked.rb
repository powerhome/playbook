# frozen_string_literal: true

module Playbook
  module PbTimeStacked
    class TimeStacked < Playbook::KitBase
      prop :time, required: true
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :timezone, default: "America/New_York"

      def classname
        # convert deprecated prop values
        generate_classname("pb_time_stacked_kit", align)
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
