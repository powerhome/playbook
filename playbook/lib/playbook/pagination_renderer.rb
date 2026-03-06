# frozen_string_literal: true

require "will_paginate/view_helpers/action_view"

module Playbook
  module Pagination
    class Rails < WillPaginate::ActionView::LinkRenderer
      attr_reader :template

      def container_attributes
        { class: "pb_paginate" }
      end

      def prepare(collection, options, template)
        super
        @template = template
      end

      def link(text, target, attributes = {})
        template.link_to(template.raw(text.to_s), url(target), attributes)
      end

      def to_html
        return "" if @collection.total_pages <= 1

        desktop = template.content_tag(
          :div,
          template.safe_join(desktop_items, @options[:link_separator].to_s),
          class: "pagination-desktop"
        )
        mobile = mobile_pagination

        inner = template.content_tag(:div, template.safe_join([desktop, mobile]), class: "pb_pagination rails-pagination-mobile")
        template.content_tag(:div, inner, **container_attributes)
      end

      def desktop_items
        items = []
        items << previous_page

        items.concat(
          windowed_page_numbers.map do |page|
            page == :gap ? gap : page_number(page)
          end
        )

        items << next_page
        items.compact
      end

      def page_number(page)
        classes = "pagination-number"
        classes += " active" if page == current_page

        if page == current_page
          template.content_tag(:li, template.content_tag(:span, page), class: classes)
        else
          template.content_tag(:li, link(page, page, rel: rel_value(page)), class: classes)
        end
      end

      def previous_or_next_page(page, text, classname)
        if page
          template.content_tag(:li, link(text, page), class: classname)
        else
          template.content_tag(:li, template.content_tag(:span, text), class: "#{classname} disabled")
        end
      end

      def gap
        template.raw("")
      end

      def mobile_pagination
        content = template.safe_join([
          mobile_prev_button,
          mobile_dropdown,
          mobile_next_button,
        ].compact)

        template.content_tag(:div, content, class: "pb_pagination_mobile pagination-mobile rails-pagination-mobile")
      end

      def mobile_prev_button
        page = @collection.current_page > 1 && @collection.current_page - 1
        classes = "pagination-left#{page ? '' : ' disabled'}"
        label = template.content_tag(:span, "Prev", class: "pagination-mobile-label")
        text = template.safe_join([chevron_left_svg, label])

        if page
          template.content_tag(:li, link(text, page), class: classes)
        else
          template.content_tag(:li, template.content_tag(:span, text), class: classes)
        end
      end

      def mobile_next_button
        page = @collection.current_page < @collection.total_pages && @collection.current_page + 1
        classes = "pagination-right#{page ? '' : ' disabled'}"
        label = template.content_tag(:span, "Next", class: "pagination-mobile-label")
        text = template.safe_join([label, chevron_right_svg])

        if page
          template.content_tag(:li, link(text, page), class: classes)
        else
          template.content_tag(:li, template.content_tag(:span, text), class: classes)
        end
      end

      def mobile_dropdown
        trigger_parts = [
          template.content_tag(:span, current_page.to_s, class: "pagination-dropdown-current"),
          template.content_tag(:span, "of #{@collection.total_pages}", class: "pagination-dropdown-total"),
          template.content_tag(:span, chevron_down_svg, class: "pagination-dropdown-icon"),
        ]
        trigger_content = template.safe_join(trigger_parts, " ")

        trigger = template.content_tag(:summary, trigger_content, class: "pagination-dropdown-trigger rails-trigger", role: "button")

        option_nodes = (1..@collection.total_pages).map do |page|
          option_class = "pagination-dropdown-option"
          option_class += " active" if page == current_page
          template.content_tag(:div, link("Page #{page}", page), class: option_class)
        end

        menu = template.content_tag(:div, template.safe_join(option_nodes), class: "pagination-dropdown-menu below")
        template.content_tag(:details, template.safe_join([trigger, menu]), class: "pagination-dropdown")
      end

      def previous_page
        num = @collection.current_page > 1 && @collection.current_page - 1
        previous_or_next_page(
          num,
          chevron_left_svg,
          "pagination-left"
        )
      end

      def next_page
        num = @collection.current_page < @collection.total_pages && @collection.current_page + 1
        previous_or_next_page(
          num,
          chevron_right_svg,
          "pagination-right"
        )
      end

    private

      def chevron_left_svg
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 30 24' fill='none' aria-hidden='true' focusable='false' class='pb_custom_icon svg-inline--fa pb_icon_kit svg_fw svg_xs'><path d='M8.20312 11.2031L17.2031 2.25C17.625 1.78125 18.3281 1.78125 18.7969 2.25C19.2188 2.67188 19.2188 3.375 18.7969 3.79688L10.5469 12L18.75 20.25C19.2188 20.6719 19.2188 21.375 18.75 21.7969C18.3281 22.2656 17.625 22.2656 17.2031 21.7969L8.20312 12.7969C7.73438 12.375 7.73438 11.6719 8.20312 11.2031Z' fill='currentColor'></path></svg>".html_safe
      end

      def chevron_right_svg
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 30 24' fill='none' aria-hidden='true' focusable='false' class='pb_custom_icon svg-inline--fa pb_icon_kit svg_fw svg_xs'><path d='M21.7969 11.2031C22.2188 11.6719 22.2188 12.375 21.7969 12.7969L12.7969 21.7969C12.3281 22.2656 11.625 22.2656 11.2031 21.7969C10.7344 21.375 10.7344 20.6719 11.2031 20.25L19.4062 12.0469L11.2031 3.79688C10.7344 3.375 10.7344 2.67188 11.2031 2.25C11.625 1.78125 12.3281 1.78125 12.75 2.25L21.7969 11.2031Z' fill='currentColor'></path></svg>".html_safe
      end

      def chevron_down_svg
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 30 24' fill='none' aria-hidden='true' focusable='false' class='pb_custom_icon svg-inline--fa pb_icon_kit svg_fw svg_xs'><path d='M21.7969 7.20312C22.2188 7.67188 22.2188 8.375 21.7969 8.79688L15.75 14.8438C15.3281 15.2656 14.625 15.2656 14.2031 14.8438L8.20312 8.79688C7.73438 8.375 7.73438 7.67188 8.20312 7.20312C8.625 6.78125 9.32812 6.78125 9.79688 7.20312L15 12.4062L20.2031 7.20312C20.6719 6.78125 21.375 6.78125 21.7969 7.20312Z' fill='currentColor'></path></svg>".html_safe
      end
    end
  end
end
