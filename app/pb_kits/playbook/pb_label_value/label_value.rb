# frozen_string_literal: true

module Playbook
  module PbLabelValue
    class LabelValue < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_label
                 configured_value].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     label: default_configuration,
                     value: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_label = label
        self.configured_value = value
      end

      def label
        if is_set? configured_label
          pb_label = Playbook::PbCaption::Caption.new(text: configured_label)
          ApplicationController.renderer.render(partial: pb_label, as: :object)
        end
      end

      def value
        pb_body = Playbook::PbBody::Body.new do
          default_value(configured_value, "")
        end
        ApplicationController.renderer.render(partial: pb_body, as: :object)
      end

      def kit_class
        "pb_label_value_kit"
      end

      def to_partial_path
        "pb_label_value/label_value"
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
