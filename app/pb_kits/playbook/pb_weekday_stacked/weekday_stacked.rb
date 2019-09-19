# frozen_string_literal: true

module Playbook
  module PbWeekdayStacked
    class WeekdayStacked < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_variant
                 configured_align
                 configured_dark
                 configured_timestamp].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     variant: default_configuration,
                     align: default_configuration,
                     dark: default_configuration,
                     timestamp: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_variant = variant
        self.configured_align = align
        self.configured_dark = dark
        self.configured_timestamp = timestamp
      end



      def kit_class
        kit_options = [
          "pb_weekday_stacked_kit",
          variant_class,
          align_class,
          dark_class
        ]
        kit_options.reject(&:nil?).join("_")
      end

      def weekday
        if is_set? timestamp_weekday
          pb_weekday = Playbook::PbCaption::Caption.new(text: timestamp_weekday, dark: dark)
          ApplicationController.renderer.render(partial: pb_weekday, as: :object)
        end
      end

      def date
        if is_set? timestamp_date
          pb_date = Playbook::PbTitle::Title.new(size: 4, text: timestamp_date, dark: dark )
          ApplicationController.renderer.render(partial: pb_date, as: :object)
        end
      end

      def to_partial_path
        "pb_weekday_stacked/weekday_stacked"
      end

    private
    
      def variant_class
        variant_options = %w[default basic minimal]
        one_of_value(configured_variant, variant_options, "default")
      end

      def timestamp
        convert_to_timestamp(configured_timestamp)
      end

      def convert_to_timestamp(time)
        time.is_a?(String) ? DateTime.parse(time) : time
      end

      def timestamp_weekday
        configured_variant == "minimal" ? timestamp.strftime("%^a").first(1) : timestamp.strftime("%^a")
      end

      def timestamp_date
        configured_variant == "default" ? "#{month}/#{day}" : timestamp.strftime("%-d")
      end

      def month
        timestamp.strftime("%-m")
      end

      def day
        timestamp.strftime("%-d")
      end

      def align_class
        align_options = %w[left center right]
        one_of_value(configured_align, align_options, "left")
      end

      def dark_class
        true_value(configured_dark, "dark", nil)
      end

      def dark
        is_true?(configured_dark)
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
