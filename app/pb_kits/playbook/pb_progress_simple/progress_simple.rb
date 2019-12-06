# frozen_string_literal: true

module Playbook
  module PbProgressSimple
    class ProgressSimple
      include Playbook::Props

      class ProgressError < StandardError; end

      partial "pb_progress_simple/progress_simple"

      prop :align, type: Playbook::Props::Enum,
           values: %w[left center right],
           default: "left"
      prop :value, type: Playbook::Props::Number
      prop :max, type: Playbook::Props::Number
      prop :muted, type: Playbook::Props::Boolean,
           default: false
      prop :percent, type: Playbook::Props::Percentage
      # :width prop should not probably be a string type
      # Should we be allowing the user to pass this value at all?
      # could this possibly be [sm, md, lg]?
      prop :width, default: "100%"

      def number_value
        validate_required_progress_props

        if percent
          validate_percent

          percent
        else
          validate_value_max

          (value * 100) / max
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
        "pb_progress_simple_wrapper_#{align}"
      end

      def classname
        generate_classname("pb_progress_simple_kit", muted_class, align)
      end

    private

      def muted_class
        muted ? "muted" : nil
      end

      def validate_required_progress_props
        unless percent || value || max
          raise(
            ProgressError,
            "Pass `percent` or pass both `value` and `max` to this kit."
          )
        end
      end

      def validate_percent
        if max || value
          raise(
            ConflictingPropsError,
            "Do not use `value` or `max` props when passing `percent`"
          )
        end
      end

      def validate_value_max
        if !value
          raise(
            MissingPropError,
            "Must pass `value` when passing `max`"
          )
        elsif !max
          raise(
            MissingPropError,
            "Must pass `max` when passing `value`"
          )
        end
      end
    end
  end
end
