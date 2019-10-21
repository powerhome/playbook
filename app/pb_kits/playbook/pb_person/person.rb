# frozen_string_literal: true

module Playbook
  module PbPerson
    class Person
      include Playbook::Props

      partial "pb_person/person"

      prop :first_name
      prop :last_name

      def classname
        generate_classname("pb_person_kit")
      end
    end
  end
end
