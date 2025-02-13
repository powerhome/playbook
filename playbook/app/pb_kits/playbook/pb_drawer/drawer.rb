# frozen_string_literal: true

module Playbook
  module PbDrawer
    class Drawer < ::Playbook::KitBase
      prop :from

      def classname
        generate_classname("pb_drawer")
      end

      def data
        Hash(values[:data]).merge(
          "from": from
        )
      end
    end
  end
end
