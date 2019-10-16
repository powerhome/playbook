# frozen_string_literal: true

module Playbook
  module PbPersonContact
    class PersonContact
      include Playbook::Props

      partial "pb_person_contact/person_contact"

      prop :name
      prop :contacts
      prop :person

      def classname
        generate_classname("pb_person_contact")
      end
    end
  end
end
