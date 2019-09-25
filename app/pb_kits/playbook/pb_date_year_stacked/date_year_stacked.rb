# frozen_string_literal: true

module Playbook
  module PbDateYearStacked
    class DateYearStacked < Playbook::PbKit::Base
      PROPS = %i[configured_align
                 configured_classname
                 configured_dark
                 configured_data
                 configured_date
                 configured_id].freeze

      def initialize(align: default_configuration,
                     classname: default_configuration,
                     dark: default_configuration,
                     data: default_configuration,
                     date: default_configuration,
                     id: default_configuration)
        self.configured_align = align
        self.configured_classname = classname
        self.configured_dark = dark
        self.configured_data = data
        self.configured_date = date
        self.configured_id = id
      end

      def align
        align_options = %w[left center right]
        one_of_value(configured_align, align_options, "left")
      end

      def dark
        is_true? configured_dark
      end

      def date
        Playbook::PbKit::PbDateTime.new(configured_date, "America/New_York")
      end

      def year
        year = date.to_year
        pb_body = Playbook::PbBody::Body.new(text: year, color: "light", dark: dark)
        ApplicationController.renderer.render(partial: pb_body, as: :object)
      end

      def day_month
        day_month = "#{date.to_day} #{date.to_month}"
        pb_title = Playbook::PbTitle::Title.new(text: day_month, size: 4, dark: dark)
        ApplicationController.renderer.render(partial: pb_title, as: :object)
      end

      def to_partial_path
        "pb_date_year_stacked/date_year_stacked"
      end

      def kit_class
        kit_options = [
          "pb_date_year_stacked",
          align,

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
