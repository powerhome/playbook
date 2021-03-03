# frozen_string_literal: true

module Playbook
  module PbPerson
    class Person < Playbook::KitBase
      prop :first_name
      prop :last_name

      def classname
        generate_classname("pb_person_kit")
      end
    end
  end
end
