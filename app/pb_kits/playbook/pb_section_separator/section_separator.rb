# frozen_string_literal: true

module Playbook
  module PbSectionSeparator
    class SectionSeparator < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_text].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     text: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_text = text
      end

      def text
        if is_set? configured_text
          pb_text = Playbook::PbCaption::Caption.new(text: configured_text)
          ApplicationController.renderer.render(partial: pb_text, as: :object)
        end
      end

      def kit_class
        "pb_section_separator_kit"
      end

      def to_partial_path
        "pb_section_separator/section_separator"
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
