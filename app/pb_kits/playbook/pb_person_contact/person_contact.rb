# frozen_string_literal: true

module Playbook
  module PbPersonContact
    class PersonContact
      include Playbook::Props

      partial "pb_person_contact/person_contact"

      prop :contacts, type: Playbook::Props::HashArray, required: true
      prop :people, type: Playbook::Props::HashArray, required: true

      def classname
        generate_classname("pb_person_contact_kit")
      end
    end
  end
end
