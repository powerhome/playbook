# frozen_string_literal: true

module Playbook
  module PbPersonContact
    class PersonContact < Playbook::KitBase
      prop :contacts, type: Playbook::Props::HashArray, default: []
      prop :first_name
      prop :last_name

      def wrong_contacts
        contacts.select { |contact| contact[:contact_type] == "wrong-phone" }
      end

      def valid_contacts
        contacts.reject { |contact| contact[:contact_type] == "wrong-phone" }
      end

      def classname
        generate_classname("pb_person_contact_kit")
      end
    end
  end
end
