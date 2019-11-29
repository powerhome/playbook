# frozen_string_literal: true

module Playbook
  module PbTextarea
    class Textarea
      include Playbook::Props

      partial "pb_textarea/textarea"

      prop :label
      prop :placeholder
      prop :value
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :rows, type: Playbook::Props::Number,
            default: 4

      def classname
        generate_classname("pb_textarea_kit", dark_class)
      end

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
