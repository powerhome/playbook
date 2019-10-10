# frozen_string_literal: true

module Playbook
  module PbCurrency
    class Currency < Playbook::PbKit::Base
      include ActionView::Helpers::NumberHelper
      PROPS = %i[configured_align
                 configured_classname
                 configured_data
                 configured_id
                 configured_label
                 configured_value
                 configured_size].freeze

      def initialize(align: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     label: default_configuration,
                     value: default_configuration,
                     size: default_configuration)
        self.configured_align = align
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_label = label
        self.configured_value = value
        self.configured_size = size
      end

      def align
        align_options = %w[left center right]
        one_of_value(configured_align, align_options, "left")
      end

      def label
        if is_set? configured_label
          pb_label = Playbook::PbCaption::Caption.new(text: configured_label)
          ApplicationController.renderer.render(partial: pb_label, as: :object)
        end
      end

      def size
        size_options = %w[lg sm]
        one_of_value(configured_size, size_options, "sm")
      end

      def value_size
        size == "lg" ? 1 : 2
      end

      def formatted_value
        number_to_currency(configured_value)
      end

      def value
        if is_set? configured_value
          display_value = formatted_value[1...-2]
          pb_title = Playbook::PbTitle::Title.new(size: value_size, text: display_value, classname: "pb_currency_value")
          ApplicationController.renderer.render(partial: pb_title, as: :object)
        end
      end

      def unit
        pb_unit = Playbook::PbBody::Body.new(classname: "unit", color: "light") do
          formatted_value.last(2)
        end
        ApplicationController.renderer.render(partial: pb_unit, as: :object)
      end

      def currency_indicator
        pb_currency_indicator = Playbook::PbBody::Body.new(classname: "currency_indicator", color: "light") do
          formatted_value.first(1)
        end
        ApplicationController.renderer.render(partial: pb_currency_indicator, as: :object)
      end

      def kit_class
        kit_options = [
          "pb_currency_kit",
          align,
        ]
        kit_options.join("_")
      end

      def to_partial_path
        "pb_currency/currency"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
