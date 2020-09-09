# frozen_string_literal: true

module Playbook
  module PbListRadios
    class ListRadios
      include Playbook::Props

      partial "pb_list_radios/list_radios"

      def classname
        generate_classname("pb_list_radios_kit")
      end
    end
  end
end
