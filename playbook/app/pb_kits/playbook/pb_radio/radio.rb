# frozen_string_literal: true

require "action_view"

module Playbook
  module PbRadio
    class Radio < Playbook::KitBase
      prop :alignment, type: Playbook::Props::String,
                       default: ""
      prop :checked, type: Playbook::Props::Boolean,
                     default: false
      prop :error, type: Playbook::Props::Boolean,
                   default: false
      prop :input_options, type: Playbook::Props::HashProp,
                           default: {}
      prop :name, type: Playbook::Props::String,
                  default: "radio_name"
      prop :text, type: Playbook::Props::String,
                  default: "Radio Text"
      prop :value, type: Playbook::Props::String,
                   default: "radio_text"
      prop :disabled, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_radio_kit") + error_class + alignment_class + disabled_class
      end

      def selected
        "checked" if checked == true
      end

      def body_status
        error ? "negative" : nil
      end

    private

      def error_class
        error ? " error" : ""
      end

      def alignment_class
        alignment == "vertical" ? " vertical" : ""
      end

      def disabled_class
        disabled ? " disabled" : ""
      end
    end
  end
end
