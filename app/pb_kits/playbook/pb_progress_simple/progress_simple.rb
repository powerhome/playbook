# frozen_string_literal: true

module Playbook
  module PbProgressSimple
    class ProgressSimple < Playbook::PbKit::Base
      PROPS = %i[configured_align
                 configured_classname
                 configured_data
                 configured_id
                 configured_max
                 configured_muted
                 configured_percent
                 configured_value
                 configured_width].freeze

      def initialize(align: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     max: default_configuration,
                     muted: default_configuration,
                     percent: default_configuration,
                     value: default_configuration,
                     width: default_configuration)
        self.configured_align = align
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_max = max
        self.configured_muted = muted
        self.configured_percent = percent
        self.configured_value = value
        self.configured_width = width
      end

      def width
        default_value(configured_width, "100%")
      end

      def number_value
        if is_set? configured_percent
          percent
        else
          calc_value_from_max
        end
      end

      def percent_value
        format_percent(number_value)
      end

      def align
        align_options = %w[left center right]
        one_of_value(configured_align, align_options, "left")
      end

      def kit_class
        kit_options = [
          "pb_progress_simple",
          muted,
          align,
        ]
        kit_options.compact.join("_")
      end

      def to_partial_path
        "pb_progress_simple/progress_simple"
      end

    private

      def percent
        default_value(configured_percent, 0)
      end

      def format_percent(num)
        "#{num}%"
      end

      def calc_value_from_max
        if is_set?(configured_value) && is_set?(configured_max)
          (configured_value.to_i * 100) / configured_max.to_i
        else
          0
        end
      end

      def muted
        true_value(configured_muted, "muted", nil)
      end

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
