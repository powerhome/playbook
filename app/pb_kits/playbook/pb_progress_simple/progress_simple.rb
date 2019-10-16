# frozen_string_literal: true

module Playbook
  module PbProgressSimple
    class ProgressSimple
      include Playbook::Props

      partial "pb_progress_simple/progress_simple"

      prop :align, type: Playbook::Props::Enum,
           values: %w[left center right],
           default: "left"
      prop :value, type: Playbook::Props::Number
      prop :max, type: Playbook::Props::Number
      prop :muted, type: Playbook::Props::Boolean,
           default: false
      prop :percent, type: Playbook::Props::Percentage # Float type
      prop :width, default: "100%" # Create type that validates only valid css measurements

      def number_value
        if percent
          percent
        else
          if value && max
            (value * 100) / max
          else
            0
          end
        end
      end

      def data_values
        prop(:data).merge(value: number_value)
      end

      def style
        "width:#{width};"
      end

      def value_style
        "width:#{number_value}%;"
      end

      def wrapper_classname
        "pb__progress_simple_wrapper_#{align}"
      end

      def classname
        generate_classname("pb_progress_simple_kit", muted_class, align)
      end

    private

      def muted_class
        muted ? "muted" : nil
      end
    end
  end
end

