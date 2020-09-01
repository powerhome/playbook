# frozen_string_literal: true

module Playbook
  module PbDateTime
    class DateTime
      include Playbook::Props

      partial "pb_date_time/date_time"

      prop :date, type: Playbook::Props::Date,
                  default: ::DateTime.current
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :timezone, type: Playbook::Props::String,
                      default: "America/New_York"
      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :show_icon, type: Playbook::Props::Boolean, default: false
      prop :show_day_of_week, type: Playbook::Props::Boolean, default: false
    end
  end
end
