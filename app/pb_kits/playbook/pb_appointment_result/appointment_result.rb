# frozen_string_literal: true

module Playbook
  module PbAppointmentResult
    class AppointmentResult
      include Playbook::Props

      partial "pb_appointment_result/appointment_result"

      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :result, type: Playbook::Props::Enum,
                    values: %w["No Pitch", "Pitch Miss", "Sold", "Unconfirmed", "Canceled", ""],
                    default: ""
      prop :text
      prop :user

      def classname
        generate_classname( "pb_appointment_result", dark_class)
      end


    private

      def dark_class
        dark ? "dark" : nil
      end

    end
  end
end
