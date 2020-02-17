# frozen_string_literal: true

module Playbook
  module PbFilter
    class Filter
      include Playbook::Props

      partial "pb_filter/filter"

      def sort_list
        sort_item = Playbook::PbList::Item.new( 
          text: "it works"
        )
        sort_list = Playbook::PbList::List.new(
          ) { sort_item}
        ApplicationController.renderer.render(partial: sort_list, as: :object)
      end

      def classname
        generate_classname("pb_filter_kit")
      end
    end
  end
end
