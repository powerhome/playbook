# frozen_string_literal: true

module Playbook
  module PbPerson
    class Person
      include Playbook::Props

      partial "pb_person/person"

      prop :first_name
      prop :last_name

      def first_name
        pb_first_name = Playbook::PbBody::Body.new(tag: "span", classname: "pb_person_first") do
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

      def classname
        generate_classname("pb_person_kit", first_name, last_name)
      end
    end
  end
end
