# frozen_string_literal: true

module Playbook
  module PbPagination
    class Pagination
      include Playbook::Props

      partial "pb_pagination/pagination"

      prop :variant, type: Playbook::Props::Enum,
                     values: %w[basic collapsed expanded scroll],
                     default: "basic"
      prop :target_page, type: Playbook::Props::Number, default: 1

      PAGINATE_RANGE = 2

      def classname
        generate_classname("pb_pagination_kit", variant)
      end

      def total_page_count per_page, total_items
        total_items / per_page
      end

      def number_of_pages target_page, per_pages, total_items
        max_page_count = total_page_count(per_pages, total_items)

        if target_page <= max_page_count
          "#{target_page} of #{ max_page_count }"
        else
          "#{max_page_count} of #{ max_page_count}"
        end
      end

      def calc_next_pages page, next_nums
        (page..page + next_nums).to_a
      end

      def calc_previous_pages page, prev_nums
        (page - prev_nums..page).to_a
      end

      def calculate_page_range
        page = values[:target_page]
        max_page = total_page_count values[:per_page], values[:total_items]

        if page <= PAGINATE_RANGE
          prev_pages = (1..page).to_a
          next_pages = calc_next_pages(page, PAGINATE_RANGE)

        elsif page < (max_page - PAGINATE_RANGE)
          prev_pages = calc_previous_pages(page, PAGINATE_RANGE)
          next_pages = calc_next_pages(page, PAGINATE_RANGE)

        elsif (max_page - PAGINATE_RANGE..max_page).to_a.include?(page)
          prev_pages = calc_previous_pages(page, PAGINATE_RANGE)
          next_pages = (page.upto(max_page)).to_a

        elsif page >= max_page
          prev_pages = calc_previous_pages(max_page, PAGINATE_RANGE)
          next_pages = calc_next_pages(max_page, 0)
        end

        range = prev_pages | next_pages
      end

    end
  end
end
