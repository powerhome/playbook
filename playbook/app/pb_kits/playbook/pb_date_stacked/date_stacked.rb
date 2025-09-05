# frozen_string_literal: true

module Playbook
  module PbDateStacked
    class DateStacked < Playbook::KitBase
      prop :date, type: Playbook::Props::Date, required: true
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md],
                  default: "sm"
      prop :reverse, type: Playbook::Props::Boolean,
                     default: false
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :bold, type: Playbook::Props::Boolean,
                  default: false

      def classname
        generate_classname("pb_date_stacked_kit", align, size, reverse_class, dark_class)
      end

      def title_size
        size == "md" ? 3 : 4
      end

      def day
        day = Playbook::PbKit::PbDateTime.new(date)
        content_tag(:time, datetime: day.to_iso) do
          day.to_day.to_s
        end
      end

      def month
        pb_date_time.to_month.capitalize
      end

      def year
        current_year = DateTime.now.year.to_i
        year = Playbook::PbKit::PbDateTime.new(date).to_year.to_i
        if current_year != year
          content_tag(:time, datetime: year) do
            year.to_s
          end
        end
      end

      def bold_class
        bold ? "bold" : nil
      end

    private

      def pb_date_time
        Playbook::PbKit::PbDateTime.new(date)
      end

      def reverse_class
        reverse ? "reverse" : nil
      end

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
