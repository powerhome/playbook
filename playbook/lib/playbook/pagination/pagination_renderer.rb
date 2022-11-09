# frozen_string_literal: true

module Playbook
  class LinkRenderer < WillPaginate::ActionView::LinkRenderer
    def container_attributes
      { class: "pb_pagination pagination" }
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

    def gap
      tag("li", tag("span", "&hellip;"), class: "disabled")
    end

    def previous_page
      num = @collection.current_page > 1 && @collection.current_page - 1
      previous_or_next_page(num, "<i class='far fa-chevron-left'></i>", "prev")
    end

    def next_page
      num = @collection.current_page < @collection.total_pages && @collection.current_page + 1
      previous_or_next_page(num, "<i class='far fa-chevron-right'></i>", "next")
    end
  end
end
