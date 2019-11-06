# frozen_string_literal: true

module Playbook
  module PbTime
    class Time
      include Playbook::Props

      partial "pb_time/time"

      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg sm xs],
                  default: "sm"
      prop :time
      prop :timestamp
      prop :timezone

      self.configured_time = time
      self.configured_timestamp = timestamp
      self.configured_timezone = timezone

      def classname
        generate_classname("pb_time_kit", size)
      end

      def timestamp
        if is_set? configured_time
          time = configured_time
        else
          time = configured_timestamp
        end
        Playbook::PbKit::PbDateTime.new(time, timezone_value)
      end

      def timezone_value
        default_value(configured_timezone, "America/New_York")
      end

      def format_time_string
        "#{timestamp.to_hour}:#{timestamp.to_minutes}#{timestamp.to_meridian}"
      end

      def timezone
        content_tag(:span, class: "pb_time_timezone") do
          timestamp.to_timezone.upcase
        end
      end

      def icon
        pb_icon = Playbook::PbIcon::Icon.new(icon: "clock", fixed_width: true)
        ApplicationController.renderer.render(partial: pb_icon, as: :object)
      end

      def text
        content_tag(:time, datetime: timestamp.to_iso) do
          content_tag(:span) do
            format_time_string
          end +
            timezone
        end
      end

      def display_value_xs
        if is_set?(configured_timestamp) || is_set?(configured_time)
          pb_value = Playbook::PbBody::Body.new(color: "default") do
            text
          end
          ApplicationController.renderer.render(partial: pb_value, as: :object)
        end
      end

      def display_value_sm
        if is_set?(configured_timestamp) || is_set?(configured_time)
          pb_value = Playbook::PbBody::Body.new(color: "default") do
            icon +
              text
          end
          ApplicationController.renderer.render(partial: pb_value, as: :object)
        end
      end

      def display_value_lg
        if is_set?(configured_timestamp) || is_set?(configured_time)
          pb_value_lg = Playbook::PbTitle::Title.new(size: 3, text: text)
          ApplicationController.renderer.render(partial: pb_value_lg, as: :object)
        end
      end
    end
  end
end
