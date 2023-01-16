# frozen_string_literal: true

module Playbook
  module PbPaginate
    class Paginate < ::Playbook::KitBase
      prop :stragety # Need to add protection
      prop :model # Need to add protection

      def classname
        generate_classname("pb_paginate")
      end
    end
  end
end
