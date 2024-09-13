# frozen_string_literal: true

require "will_paginate/view_helpers/action_view"

module Playbook
  module Pagination
    class Rails < WillPaginate::ActionView::LinkRenderer
      def container_attributes
        { class: "pb_pagination" }
      end

      def page_number(page)
        if page == current_page
          tag("li", tag("span", page), class: "active")
        else
          tag("li", link(page, page, rel: rel_value(page)))
        end
      end

      def previous_or_next_page(page, text, classname)
        if page
          tag("li", link(text, page), class: classname)
        else
          tag("li", tag("span", text), class: "%s disabled")
        end
      end

      def gap; end

      def previous_page
        num = @collection.current_page > 1 && @collection.current_page - 1
        previous_or_next_page(
          num,
          "<i> pb_rails('icon', props: { icon: 'chevron-left', fixed_width: true, size: 'xs' }) </i>",
          "prev"
        )
      end

      def next_page
        num = @collection.current_page < @collection.total_pages && @collection.current_page + 1
        previous_or_next_page(
          num,
          "<i> pb_rails('icon', props: { icon: 'chevron-right', fixed_width: true, size: 'xs' }) </i>",
          "next"
        )
      end
    end
  end
end
