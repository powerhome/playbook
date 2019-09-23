# frozen_string_literal: true

module Playbook
  module PbTimeStacked
    class TimeStacked < Playbook::PbKit::Base
      include ActionView::Helpers::TagHelper
      include ActionView::Context

      PROPS = %i[configured_classname
                 configured_dark
                 configured_data
                 configured_align
                 configured_id
                 configured_time
                 configured_timezone].freeze

      def initialize(classname: default_configuration,
                     dark: default_configuration,
                     data: default_configuration,
                     align: default_configuration,
                     id: default_configuration,
                     time: default_configuration,
                     timezone: default_configuration)
        self.configured_classname = classname
        self.configured_dark = dark
        self.configured_data = data
        self.configured_align = align
        self.configured_id = id
        self.configured_time = time
        self.configured_timezone = timezone
      end

      def text
        time_text + timezone
      end

      def time_iso
        timestamp.to_iso
      end

      def kit_class
        kit_options = [
          "pb_time_stacked_kit",
          align,
        ]
        kit_options.join("_")
      end

      def to_partial_path
        "pb_time_stacked/time_stacked"
      end

    private

      def align
        align_options = %w[left center right]
        one_of_value(configured_align, align_options, "left")
      end

      def dark
        is_true? configured_dark
      end

      def format_time_string
        "#{timestamp.to_hour}:#{timestamp.to_minutes}#{timestamp.to_meridian}" if is_set? configured_time
      end

      def timestamp
        Playbook::PbKit::PbDateTime.new(configured_time, timezone_value)
      end

      def timezone_value
        default_value(configured_timezone, "America/New_York")
      end

      def timezone
        pb_timezone = Playbook::PbCaption::Caption.new(text: timestamp.to_timezone.upcase, dark: dark)
        ApplicationController.renderer.render(partial: pb_timezone, as: :object)
      end

      def time_text
        pb_timezone = Playbook::PbCaption::Caption.new(text: format_time_string, dark: dark)
        ApplicationController.renderer.render(partial: pb_timezone, as: :object)
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
