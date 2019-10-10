# frozen_string_literal: true

require "action_view"

module Playbook
  module PbContact
    class Contact < Playbook::PbKit::Base
      include ActionView::Helpers::NumberHelper

      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_contact_type
                 configured_contact_value].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     contact_type: default_configuration,
                     contact_value: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_contact_type = contact_type
        self.configured_contact_value = contact_value
      end

      def contact_type
        case configured_contact_type
        when "cell"
          icon = "mobile"
        when "home"
          icon = "phone"
        when "work"
          icon = "phone-office"
        when "email"
          icon = "envelope"
        else # "unknown" || "other"
          icon = "phone"
        end
        contact_type_props = { icon: icon, fixed_width: true }
        pb_contact_type = Playbook::PbIcon::Icon.new(contact_type_props)
        ApplicationController.renderer.render(partial: pb_contact_type, as: :object)
      end

      def contact_value
        if is_set? configured_contact_value
          unless configured_contact_type == "email"
            new_value = number_to_phone(formatted_value, area_code: true) if formatted_value
          else
            new_value = configured_contact_value
          end
          pb_body = Playbook::PbBody::Body.new(color: "light") do
            contact_type + new_value
          end
          ApplicationController.renderer.render(partial: pb_body, as: :object)
        end
      end

      def formatted_value
        configured_contact_value.to_s.gsub(/\D/, "")
      end

      def to_partial_path
        "pb_contact/contact"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
