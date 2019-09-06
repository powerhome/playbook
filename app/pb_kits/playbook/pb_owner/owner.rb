# frozen_string_literal: true

module Playbook
  module PbOwner
    class Owner < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_first_name
                 configured_last_name].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     first_name: default_configuration,
                     last_name: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_first_name = first_name
        self.configured_last_name = last_name
      end

      def first_name
        pb_first_name = Playbook::PbBody::Body.new(tag: "span", classname: "pb_owner_first") do
          default_value(configured_first_name, "")
        end
        ApplicationController.renderer.render(partial: pb_first_name, as: :object)
      end

      def last_name
        if is_set? configured_last_name
          pb_last_name = Playbook::PbTitle::Title.new(text: configured_last_name, size: 4)
          ApplicationController.renderer.render(partial: pb_last_name, as: :object)
        end
      end

      def to_partial_path
        "pb_owner/owner"
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
