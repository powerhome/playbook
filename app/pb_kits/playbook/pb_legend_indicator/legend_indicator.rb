# frozen_string_literal: true

module Playbook
  module PbLegendIndicator
    class LegendIndicator < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_color
                 configured_data
                 configured_id
                 configured_text].freeze

      def initialize(classname: default_configuration,
                     color: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     text: default_configuration)
        self.configured_classname = classname
        self.configured_color = color
        self.configured_data = data
        self.configured_id = id
        self.configured_text = text
      end

      def color
        color_options = %w[blue green]
        one_of_value(configured_color, color_options, "blue")
      end

      def text
        if is_set? configured_text
          pb_text = Playbook::PbBody::Body.new(color: "light", tag: "span") do
            configured_text
          end
          ApplicationController.renderer.render(partial: pb_text, as: :object)
        end
      end

      def kit_class
        kit_options = [
          "pb_legend_indicator_kit",
          color
        ]
        kit_options.join("_")
      end

      def to_partial_path
        "pb_legend_indicator/legend_indicator"
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
