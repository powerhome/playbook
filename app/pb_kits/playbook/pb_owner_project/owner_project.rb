# frozen_string_literal: true

module Playbook
  module PbOwnerProject
    class OwnerProject < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
      end

      def to_partial_path
        "pb_owner_project/owner_project"
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
