# frozen_string_literal: true

module Playbook
  module PbDateTime
    class DateTime < Playbook::KitBase
      prop :date, type: Playbook::Props::Date,
                  default: ::DateTime.current
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :timezone, type: Playbook::Props::String,
                      default: "America/New_York"
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md],
                  default: "md"
      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :show_icon, type: Playbook::Props::Boolean, default: false
      prop :show_day_of_week, type: Playbook::Props::Boolean, default: false
      prop :show_current_year, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_date_time_kit", align)
      end
    end
  end
end
