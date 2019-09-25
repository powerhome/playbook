# frozen_string_literal: true

module Playbook
  module PbProgressPills
    class ProgressPills < Playbook::PbKit::Base
      PROPS = %i[configured_active
                 configured_classname
                 configured_data
                 configured_id
                 configured_steps].freeze

      def initialize(active: 0,
                     classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     steps: 0)
        self.configured_active = active
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_steps = steps
      end

      def active
        default_value(configured_active.to_i, 0)
      end

      def steps
        default_value(configured_steps.to_i, 0)
      end

      def to_partial_path
        "pb_progress_pills/progress_pills"
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
