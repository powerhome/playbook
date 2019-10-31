# frozen_string_literal: true

module Playbook
  module PbStatChange
    class StatChange
      include Playbook::Props

        partial "pb_stat_change/stat_change"

        prop :change, type: Playbook::Props::Enum,
                      values: %w[neutral increase decrease],
                      default: "neutral"
        prop :value, default: ""


      def status
        case change
        when "increase"
          "positive"
        when "decrease"
          "negative"
        else
          "neutral"
        end
      end

      def icon
        case change
        when "increase"
          "arrow-up"
        when "decrease"
          "arrow-down"
        end
      end

      # def display_icon
      #   if !icon.nil?
      #     pb_icon = Playbook::PbIcon::Icon.new(icon: icon, fixed_width: true)
      #     ApplicationController.renderer.render(partial: pb_icon, as: :object)
      #   else
      #     ""
      #   end
      # end

      # def display_value
      #   pb_icon_element = Playbook::PbBody::Body.new(status: status) do
      #     display_icon +
      #       value
      #   end
      #   ApplicationController.renderer.render(partial: pb_icon_element, as: :object)
      # end

      def classname
        generate_classname("pb_stat_change_kit", status,)
      end
    end
  end
end
