# frozen_string_literal: true

module Playbook
  module PbPersonContact
    class PersonContact
      include Playbook::Props

      partial "pb_person_contact/person_contact"

      prop :contacts, type: Playbook::Props::HashArray, default: []
      prop :people, type: Playbook::Props::HashArray, default: []
      prop :wrong_contacts, type: Playbook::Props::HashArray, default: []

      def filter_number
        if contact_type = "wrong number"
          wrong_number << contact
          positon = contacts.find_index(contact)
          contacts.delete_at(position)
        end
        wrong_number
        contacts
      end

      def classname
        generate_classname("pb_person_contact_kit")
      end
    end
  end
end
