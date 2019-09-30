# frozen_string_literal: true

module Playbook
  module PbDateRangeInline
    class DateRangeInline < Playbook::PbKit::Base
      include ActionView::Helpers::TagHelper
      include ActionView::Context

      PROPS = %i[configured_classname
                 configured_data
                 configured_end_date
                 configured_id
                 configured_start_date].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     end_date: default_configuration,
                     id: default_configuration,
                     start_date: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_end_date = end_date
        self.configured_start_date = start_date
      end

      def end_date
        date_time = Playbook::PbKit::PbDateTime.new(default_value(configured_end_date, ""))
        content_tag(:time, datetime: date_time.to_iso) do
          "#{date_time.to_day} #{date_time.to_month_downcase} #{date_time.to_year}"
        end
      end

      def start_date
        date_time = Playbook::PbKit::PbDateTime.new(default_value(configured_start_date, ""))
        content_tag(:time, datetime: date_time.to_iso) do
          "#{date_time.to_day} #{date_time.to_month_downcase} #{date_time.to_year}"
        end
      end

      def to_partial_path
        "pb_date_range_inline/date_range_inline"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
