# frozen_string_literal: true

module Playbook
  module PbDate
    class Date < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_size
                 configured_timestamp].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     size: default_configuration,
                     timestamp: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_size = size
        self.configured_timestamp = timestamp
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

      def size
        size_options = %w[lg sm]
        one_of_value(configured_size, size_options, "sm")
      end

      def convert_to_timestamp(ts)
        ts.is_a?(String) ? DateTime.parse(ts) : nil
      end

      def day_of_week
        if is_set? configured_timestamp
          timestamp = convert_to_timestamp(configured_timestamp)
          timestamp.strftime("%a")
        end
      end

      def month
        if is_set? configured_timestamp
          timestamp = convert_to_timestamp(configured_timestamp)
          timestamp.strftime("%^b")
        end
      end

      def day
        if is_set? configured_timestamp
          timestamp = convert_to_timestamp(configured_timestamp)
          timestamp.strftime("%e")
        end
      end

      def icon
        pb_icon = Playbook::PbIcon::Icon.new(icon: "calendar", fixed_width: true)
        ApplicationController.renderer.render(partial: pb_icon, as: :object)
      end

      def text
        if is_set? configured_timestamp
          "<span>#{day_of_week.upcase} &middot; #{month.upcase} #{day}</span>".html_safe
        end
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
          pb_value_lg = Playbook::PbTitle::Title.new(size: 3, text: "#{month.upcase} #{day}")
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
