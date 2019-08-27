# frozen_string_literal: true

module Playbook
  module PbOnlineStatus
    class OnlineStatus < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_status].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     status: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_status = status
      end

      def status
        status_options = %w[online offline away]
        one_of_value(configured_status, status_options, "offline")
      end

      def kit_class
        kit_options = [
          "pb_online_status_kit",
          status,
        ]
        kit_options.join("_")
      end

      def to_partial_path
        "pb_online_status/online_status"
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
