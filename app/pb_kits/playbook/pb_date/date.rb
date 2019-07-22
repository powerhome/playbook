# frozen_string_literal: true

module Playbook
  module PbDate
    class Date < Playbook::PbKit::Base
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
        size == "lg" ? display_value_lg : display_value_sm
      end

      def kit_class
        "pb_date"
      end

      def to_partial_path
        "pb_date/date"
      end

    private

      def timestamp
        timestamp = convert_to_timestamp(configured_timestamp)
      end

      def convert_to_timestamp(ts)
        ts.is_a?(String) ? DateTime.parse(ts) : ts
        ts.in_time_zone(timezone_value)
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
        size_options = %w[lg sm]
        one_of_value(configured_size, size_options, "sm")
      end

      def icon
        pb_icon = Playbook::PbIcon::Icon.new(icon: "calendar", fixed_width: true)
        ApplicationController.renderer.render(partial: pb_icon, as: :object)
      end

      def text
        "<span>#{day_of_week} &middot; #{month} #{day}</span>".html_safe
      end

      def display_value_sm
        if is_set? configured_timestamp
          pb_value = Playbook::PbBody::Body.new(color: "default") do
            icon +
              text
          end
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
