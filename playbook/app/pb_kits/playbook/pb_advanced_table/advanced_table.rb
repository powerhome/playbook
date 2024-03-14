# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class AdvancedTable < Playbook::KitBase
      def classname
        generate_classname("pb_advanced_table")
      end
    end
  end
end
