# frozen_string_literal: true

module Playbook
  module PbRadio
    class Radio
      include Playbook::Props

      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :tag, type: Playbook::Props::String, default: "label"
      prop :text, type: Playbook::Props::String, default: "Radio Item"
      prop :name, type: Playbook::Props::String, default: "RadioGroup"
      prop :value, type: Playbook::Props::String, default: "placeholder-value"
      prop :checked
      def classname
        [
          [
            "pb_radio_kit",
            dark_class,
          ].compact.join("_"),
          prop(:classname),
        ].join(" ")
      end

      def to_partial_path
        "pb_radio/radio"
      end

      def selected
        if checked == true
          "checked"
        end
      end

    private

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
