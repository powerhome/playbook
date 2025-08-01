# frozen_string_literal: true

module Playbook
  module PbDate
    class Date < Playbook::KitBase
      prop :date, required: true
      prop :alignment, type: Playbook::Props::Enum,
                       values: %w[left center right],
                       default: "left"
      prop :show_icon, type: Playbook::Props::Boolean,
                       default: false
      prop :show_day_of_week, type: Playbook::Props::Boolean,
                              default: false
      prop :show_current_year, type: Playbook::Props::Boolean,
                               default: false
      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg md sm xs],
                  default: "md"
      prop :timezone, default: "America/New_York"
      prop :unstyled, type: Playbook::Props::Boolean,
                      default: false

      def classname
        generate_classname("pb_date_kit", alignment)
      end

      def day_of_week
        pb_date_time.to_day_of_week
      end

      def day
        pb_date_time.to_day
      end

      def month
        pb_date_time.to_month.capitalize
      end

      def year
        pb_date_time.to_year
      end

    private

      def pb_date_time
        Playbook::PbKit::PbDateTime.new(date, timezone)
      end
    end
  end
end
