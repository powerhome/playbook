# frozen_string_literal: true

module Playbook
  module PbDateRangeStacked
    class DateRangeStacked < Playbook::PbKit::Base
      include ActionView::Helpers::TagHelper
      include ActionView::Context

      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_start_date
                 configured_end_date
                 configured_dark].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     start_date: default_configuration,
                     end_date: default_configuration,
                     dark: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_start_date = start_date
        self.configured_end_date = end_date
        self.configured_dark = dark
      end

      def start_date
        Playbook::PbKit::PbDateTime.new(configured_start_date)
      end

      def start_day_month
        day_month = "#{start_date.to_day} #{start_date.to_month}"
        pb_title = Playbook::PbTitle::Title.new(text: day_month, size: 4, dark: dark)
        ApplicationController.renderer.render(partial: pb_title, as: :object)
      end

      def start_year
        year = start_date.to_year
        pb_body = Playbook::PbBody::Body.new(text: year, color: "light", dark: dark)
        ApplicationController.renderer.render(partial: pb_body, as: :object)
      end

      def end_date
        Playbook::PbKit::PbDateTime.new(configured_end_date)
      end

      def end_day_month
        day_month = "#{end_date.to_day} #{end_date.to_month}"
        pb_title = Playbook::PbTitle::Title.new(text: day_month, size: 4, dark: dark)
        ApplicationController.renderer.render(partial: pb_title, as: :object)
      end

      def end_year
        year = end_date.to_year
        pb_body = Playbook::PbBody::Body.new(text: year, color: "light", dark: dark)
        ApplicationController.renderer.render(partial: pb_body, as: :object)
      end

      def to_partial_path
        "pb_date_range_stacked/date_range_stacked"
      end

      def dark
        is_true? configured_dark
      end

      def kit_class
        kit_options = [
          "pb_date_range_stacked",
          dark
        ]
        kit_options.join("_")
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
