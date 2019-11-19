# frozen_string_literal: true

module Playbook
  module PbPersonContact
    class PersonContact
      include Playbook::Props

      partial "pb_person_contact/person_contact"

      prop :contacts, type: Playbook::Props::HashArray, default: []
      prop :first_name
      prop :last_name

      def wrong_contacts
        contacts.select { |contact| contact[:contact_type] == "wrong number" }
      end

      def valid_contacts
        contacts.reject { |contact| contact[:contact_type] == "wrong number" }
      end

      def classname
        generate_classname("pb_person_contact_kit")
      end
    end
  end
end
