# frozen_string_literal: true

module Playbook
  module PbOwnerPhone
    class OwnerPhone < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_first_name
                 configured_last_name
                 configured_number
                 configured_icon].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     first_name: default_configuration,
                     last_name: default_configuration,
                     number: default_configuration,
                     icon: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_first_name = first_name
        self.configured_last_name = last_name
        self.configured_number = number
        self.configured_icon = icon
      end

      def icon
        configured_icon if is_set? configured_icon
      end

      def phone
        phone = Playbook::PbPhone::Phone.new(icon: configured_icon, number: configured_number)
        ApplicationController.renderer.render(partial: phone, as: :object)
      end

      def name
        owner = Playbook::PbOwner::Owner.new(first_name: configured_first_name, last_name: configured_last_name)
        ApplicationController.renderer.render(partial: owner, as: :object)
      end

      def number
        configured_number if is_set? configured_number
      end

      def to_partial_path
        "pb_owner_phone/owner_phone"
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
