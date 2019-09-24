# frozen_string_literal: true

module Playbook
  module PbDateYear
    class DateYear < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_date
                 configured_align
                 configured_dark].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     date: default_configuration,
                     align: default_configuration,
                     dark: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_date = date
        self.configured_align = align
        self.configured_dark = dark
      end

      def day
        Date.new
      end

      def date
        if is_set? configured_date
          pb_date = Date.new(Date.today)
          ApplicationController.renderer.render(partial: pb_date, as: :object)
        end
      end

      def year
        if is_set? configured_date
          pb_body = Playbook::PbBody::Body.new(text: configured_date, color: light, classname: "pb_date_year_year")
          ApplicationController.renderer.render(partial: pb_body, as: :object)
        end
      end

      def dark
        true_value(configured_dark, "date-year-dark", nil)
      end

      def to_partial_path
        "pb_date_year/date_year"
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
