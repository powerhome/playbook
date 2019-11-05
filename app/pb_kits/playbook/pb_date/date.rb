# frozen_string_literal: true

module Playbook
  module PbDate
    class Date
      include ActionView::Helpers::TagHelper
      include ActionView::Context
      include Playbook::Props
      partial "pb_date/date"

      prop :date
      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg sm xs],
                  default: "sm"
      prop :timestamp
      prop :timezone, type: Playbook::Props::Enum,
                      default: "America/New_York"



      def display_value
        case size
        when "lg"
          display_value_lg
        when "sm"
          display_value_sm
        else
          display_value_xs
        end
      end

      def classname
        generate_classname("pb_date_kit")
      end


    private

      def timestamp
        if is_set? date
          date = date
        else
          date = timestamp
        end
        Playbook::PbKit::PbDateTime.new(date, timezone_value)
      end

      # def timezone_value
      #   default_value(configured_timezone, "America/New_York")
      # end

      # def icon
      #   pb_icon = Playbook::PbIcon::Icon.new(icon: "calendar", fixed_width: true)
      #   ApplicationController.renderer.render(partial: pb_icon, as: :object)
      # end

      def text
        content_tag(:span) do
          "#{timestamp.to_day_of_week.upcase} &middot; #{timestamp.to_month.upcase} #{timestamp.to_day}".html_safe
        end
      end

      def display_value_xs
        if is_set?(timestamp) || is_set?(date)
          pb_value = Playbook::PbTitle::Title.new(size: 4, text: text)
          ApplicationController.renderer.render(partial: pb_value, as: :object)
        end
      end

      def display_value_sm
        if is_set?(timestamp) || is_set?(date)
          pb_value = Playbook::PbTitle::Title.new(size: 4, text: icon + text)
          ApplicationController.renderer.render(partial: pb_value, as: :object)
        end
      end

      def display_value_lg
        if is_set?(timestamp) || is_set?(date)
          pb_value_lg = Playbook::PbTitle::Title.new(size: 3, text: "#{timestamp.to_month.upcase} #{timestamp.to_day}")
          ApplicationController.renderer.render(partial: pb_value_lg, as: :object)
        end
      end
    end
  end
end
