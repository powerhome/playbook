# frozen_string_literal: true

module Playbook
  module PbDate
    class Date < Playbook::PbKit::Base
      include ActionView::Helpers::TagHelper
      include ActionView::Context

      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_size
                 configured_timestamp
                 configured_timezone].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     size: default_configuration,
                     timestamp: default_configuration,
                     timezone: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_size = size
        self.configured_timestamp = timestamp
        self.configured_timezone = timezone
      end

      def display_value
        case size
        when "lg"
          display_value_lg
        when "sm"
          display_value_sm
        else
          display_value_xs
        end
      end

      def kit_class
        "pb_date_kit"
      end

      def to_partial_path
        "pb_date/date"
      end

    private

      def timestamp
        convert_to_timestamp(configured_timestamp)
      end

      def convert_to_timestamp(time)
        time.is_a?(String) ? DateTime.parse(time) : time
        time.in_time_zone(timezone_value)
      end

      def timezone_value
        default_value(configured_timezone, "America/New_York")
      end

      def day_of_week
        timestamp.strftime("%a").upcase
      end

      def month
        timestamp.strftime("%^b").upcase
      end

      def day
        timestamp.strftime("%e")
      end

      def size
        size_options = %w[lg sm xs]
        one_of_value(configured_size, size_options, "sm")
      end

      def icon
        pb_icon = Playbook::PbIcon::Icon.new(icon: "calendar", fixed_width: true)
        ApplicationController.renderer.render(partial: pb_icon, as: :object)
      end

      def text
        content_tag(:span) do
          "#{day_of_week} &middot; #{month} #{day}".html_safe
        end
      end

      def display_value_xs
        if is_set? configured_timestamp
          pb_value = Playbook::PbTitle::Title.new(size: 4, text: text)
          ApplicationController.renderer.render(partial: pb_value, as: :object)
        end
      end

      def display_value_sm
        if is_set? configured_timestamp
          pb_value = Playbook::PbTitle::Title.new(size: 4, text: icon + text)
          ApplicationController.renderer.render(partial: pb_value, as: :object)
        end
      end

      def display_value_lg
        if is_set? configured_timestamp
          pb_value_lg = Playbook::PbTitle::Title.new(size: 3, text: "#{month} #{day}")
          ApplicationController.renderer.render(partial: pb_value_lg, as: :object)
        end
      end

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
