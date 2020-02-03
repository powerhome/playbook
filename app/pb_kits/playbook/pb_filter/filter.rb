# frozen_string_literal: true

module Playbook
  module PbFilter
    class Filter
      include Playbook::Props

      partial "pb_filter/filter"
    end
  end
end
