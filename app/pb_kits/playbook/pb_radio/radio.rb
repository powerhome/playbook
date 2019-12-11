# frozen_string_literal: true

require "action_view"

module Playbook
  module PbRadio
    class Radio
      include ActionView::Helpers::FormTagHelper
      include ActionView::Context
      include Playbook::Props

      partial "pb_radio/radio"

      prop :checked, type: Playbook::Props::Boolean,
                     default: false
      prop :dark, type: Playbook::Props::Boolean,
                      default: false
      prop :name, type: Playbook::Props::String,
                      default: "radio_name"
      prop :text, type: Playbook::Props::String,
                      default: "Radio Text"
      prop :value, type: Playbook::Props::String,
                      default: "radio_text"
      prop :object
      def classname
        generate_classname("pb_radio_kit", dark_class)
      end

      def input
        check_box_tag(name, value, checked)
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
