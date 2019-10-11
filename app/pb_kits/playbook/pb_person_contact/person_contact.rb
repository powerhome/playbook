# frozen_string_literal: true

module Playbook
  module PbPersonContact
    class PersonContact < Playbook::PbKit::Base
      PROPS = %i[
        configured_classname
        configured_data
        configured_id
        configured_first_name
        configured_last_name
        configured_contacts
      ].freeze

      def initialize(
        classname: default_configuration,
        data: default_configuration,
        id: default_configuration,
        first_name: default_configuration,
        last_name: default_configuration,
        contacts: default_configuration
       )
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_first_name = first_name
        self.configured_last_name = last_name
        self.configured_contacts = contacts
      end


      def name
        person = Playbook::PbPerson::Person.new(first_name: configured_first_name, last_name: configured_last_name)
        ApplicationController.renderer.render(partial: person, as: :object)
      end

      def contacts
        configured_contacts if is_set? configured_contacts
      end

      def to_partial_path
        "pb_person_contact/person_contact"
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
