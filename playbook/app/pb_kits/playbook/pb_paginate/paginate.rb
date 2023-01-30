# frozen_string_literal: true

module Playbook
  module PbPaginate
    class Paginate < ::Playbook::KitBase
      prop :model
      prop :view

      def classname
        generate_classname("pb_paginate")
      end

      def url_for(options = nil)
        view.url_for(options)
      end
    end
  end
end
