# frozen_string_literal: true

module Playbook
  module PbCheckboxCard
    class CheckboxCard < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_selected
                 configured_content].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     content: default_configuration,
                     selected: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_content = content
        self.configured_selected = selected
      end

      def content
        default_value(configured_content, "")
      end

      def selected
        is_true? configured_selected
      end

      def checkbox
        pb_checkbox = Playbook::PbCheckbox::Checkbox.new(checked: selected, icon: "check")
        ApplicationController.renderer.render(partial: pb_checkbox, as: :object)
      end

      def to_partial_path
        "pb_checkbox_card/checkbox_card"
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
