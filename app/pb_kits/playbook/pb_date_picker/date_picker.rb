# frozen_string_literal: true

module Playbook
  module PbDatePicker
    class DatePicker
      include Playbook::Props

      partial "pb_date_picker/date_picker"

      def classname
        generate_classname("pb_date_picker")
      end
    end
  end
end
