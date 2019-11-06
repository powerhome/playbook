# frozen_string_literal: true

module Playbook
  module PbDate
    class Date
      include ActionView::Helpers::TagHelper
      include ActionView::Context
      include Playbook::Props
      partial "pb_date/date"

      prop :date, required: true
      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg sm xs],
                  default: "sm"

      def display_size
        case size
        when "lg"
          lg_date_string
        when "sm"
          sm_date_string
        else
          xs_date_string
        end
      end

      def classname
        generate_classname("pb_date_kit")
      end

      def xs_date_string
        "#{pb_date_time.to_day_of_week.upcase} &middot; #{pb_date_time.to_month.upcase} #{pb_date_time.to_day}".html_safe
      end

      def lg_date_string
        "#{pb_date_time.to_month.upcase} #{pb_date_time.to_day}"
      end

      def sm_date_string
        "#{pb_date_time.to_day_of_week.upcase} &middot; #{pb_date_time.to_month.upcase} #{pb_date_time.to_day}".html_safe
      end

    private

      def pb_date_time
        @pb_date_time ||= Playbook::PbKit::PbDateTime.new(date)
      end

      # def icon
      #   pb_icon = Playbook::PbIcon::Icon.new(icon: "calendar", fixed_width: true)
      #   ApplicationController.renderer.render(partial: pb_icon, as: :object)
      # end

      # def text
      #   content_tag(:span) do
      #     "#{pb_date_time.to_day_of_week.upcase} &middot; #{pb_date_time.to_month.upcase} #{pb_date_time.to_day}".html_safe
      #   end
      # end

      # def display_size_xs
      #   pb_value = Playbook::PbTitle::Title.new(size: 4, text: text)
      #   ApplicationController.renderer.render(partial: pb_value, as: :object)
      # end

      # def display_size_sm
      #   pb_value = Playbook::PbTitle::Title.new(size: 4, text: icon + text)
      #   ApplicationController.renderer.render(partial: pb_value, as: :object)
      # end

      # def display_size_lg
      #   pb_value_lg = Playbook::PbTitle::Title.new(size: 3, text: "#{timestamp.to_month.upcase} #{timestamp.to_day}")
      #   ApplicationController.renderer.render(partial: pb_value_lg, as: :object)
      # end
    end
  end
end
