# frozen_string_literal: true

require "action_view"

module Playbook
  module PbContact
    class Contact
      include ActionView::Helpers::NumberHelper
      include Playbook::Props

      partial "pb_contact/contact"

      prop :contact_type
      prop :contact_value
      prop :contact_detail

      def classname
        generate_classname("pb_contact_kit")
      end

      def contact_icon
        case contact_type
        when "cell"
          "mobile"
        when "home"
          "phone"
        when "work"
          "phone-office"
        when "email"
          "envelope"
        else # "unknown" || "other"
          "phone"
        end
      end

      def formatted_contact_value
        if contact_type == "email"
          contact_value
        else
          number_to_phone(formatted_value, area_code: true)
        end
      end

      def formatted_contact_details
        "#{formatted_contact_value} #{separator} #{contact_detail}"
      end

    private

      def formatted_value
        contact_value.to_s.gsub(/\D/, "")
      end

      def separator
        contact_detail ? "\u00b7" : ""
      end
    end
  end
end
