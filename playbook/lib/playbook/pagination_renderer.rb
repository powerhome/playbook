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
          "<svg xmlns='http://www.w3.org/2000/svg' width='1em' viewBox='0 0 30 24' fill='none' class='pb_custom_icon svg-inline--fa pb_icon_kit svg_fw svg_xs' id='' data='{}' aria='{:label=>&quot;away&quot;}' tabindex=''><path d='M8.20312 11.2031L17.2031 2.25C17.625 1.78125 18.3281 1.78125 18.7969 2.25C19.2188 2.67188 19.2188 3.375 18.7969 3.79688L10.5469 12L18.75 20.25C19.2188 20.6719 19.2188 21.375 18.75 21.7969C18.3281 22.2656 17.625 22.2656 17.2031 21.7969L8.20312 12.7969C7.73438 12.375 7.73438 11.6719 8.20312 11.2031Z' fill='currentColor'></path></svg>",
          "prev"
        )
      end

      def next_page
        num = @collection.current_page < @collection.total_pages && @collection.current_page + 1
        previous_or_next_page(
          num,
          "<svg xmlns='http://www.w3.org/2000/svg' width='1em' viewBox='0 0 30 24' fill='none' class='pb_custom_icon svg-inline--fa pb_icon_kit svg_fw svg_xs' id='' data='{}' aria='{:label=>&quot;away&quot;}' tabindex=''><path d='M21.7969 11.2031C22.2188 11.6719 22.2188 12.375 21.7969 12.7969L12.7969 21.7969C12.3281 22.2656 11.625 22.2656 11.2031 21.7969C10.7344 21.375 10.7344 20.6719 11.2031 20.25L19.4062 12.0469L11.2031 3.79688C10.7344 3.375 10.7344 2.67188 11.2031 2.25C11.625 1.78125 12.3281 1.78125 12.75 2.25L21.7969 11.2031Z' fill='currentColor'></path></svg>",
          "next"
        )
      end
    end
  end
end
