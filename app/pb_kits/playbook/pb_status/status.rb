# frozen_string_literal: true

module Playbook
  module PbStatus
    class Status < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_active
                 configured_status
                 configured_statuses
                 configured_id].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     active: default_configuration,
                     status: default_configuration,
                     statuses: default_configuration,
                     id: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_active = active
        self.configured_status = status
        self.configured_statuses = statuses
        self.configured_id = id
      end

      def active
        one_of_value(configured_active, statuses, configured_statuses.first) if is_set? configured_active
      end

      def statuses
        configured_statuses if is_set? configured_statuses
      end

      def status
        if is_set? configured_status
          pb_status = Playbook::PbStatus::Status.new(variant: configured_status, fixed_width: true)
          ApplicationController.renderer.render(partial: pb_status, as: :object)
        end
      end

      def kit_class
        kit_options = [
          "pb_status_kit",
        ]
        kit_options.join("_")
      end

      def first_class
        statuses.first() == configured_active ? "status_first" : nil
      end

      def last_class
        statuses.last() == configured_active ? "status_last" : nil
      end

      def to_partial_path
        "pb_status/status"
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
