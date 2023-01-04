# frozen_string_literal: true

require "will_paginate/array"
module Playbook
  module PbPagination
    class Pagination < ::Playbook::KitBase
      prop :data, type: Playbook::Props::Array,
                  default: []
      def page_data
        new_user_array = []
        data.each do |user|
          new_user_array.push(user)
        end
        new_user_array.paginate(page: params[:page], per_page: 1)
      end
    end
  end
end
