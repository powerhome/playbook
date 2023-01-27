# frozen_string_literal: true

module Playbook
  module PbPaginate
    class Paginate < ::Playbook::KitBase
      prop :strategy # Need to add protection
      prop :model # Need to add protection
      prop :view # Need to add protection

      def classname
        generate_classname("pb_paginate")
      end

      def url_for(options = nil)
        view.url_for(options)
      end
    end
  end
end
