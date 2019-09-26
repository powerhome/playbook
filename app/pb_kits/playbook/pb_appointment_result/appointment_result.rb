# frozen_string_literal: true

module Playbook
  module PbAppointmentResult
    class AppointmentResult < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_dark
                 configured_data
                 configured_id
                 configured_result
                 configured_text
                 configured_user].freeze

      def initialize(classname: default_configuration,
                     dark: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     result: default_configuration,
                     text: default_configuration,
                     user: default_configuration)
        self.configured_classname = classname
        self.configured_dark = dark
        self.configured_data = data
        self.configured_id = id
        self.configured_result = result
        self.configured_text = text
        self.configured_user = user
      end

      def dark
        true_value(configured_dark, "true value", "false value")
      end

      def result
        result_options = ["No Pitch", "Pitch Miss", "Sold", "Unconfirmed", "Canceled", ""]
        one_of_value(configured_result, result_options, "")
      end

      def text
        default_value(configured_text, "")
      end

      def user
        default_value(configured_user, "")
      end

      def to_partial_path
        "pb_appointment_result/appointment_result"
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
