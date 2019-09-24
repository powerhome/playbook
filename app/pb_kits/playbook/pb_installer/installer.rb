# frozen_string_literal: true

module Playbook
  module PbInstaller
    class Installer < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_link
                 configured_name].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     link: nil,
                     name: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_link = link
        self.configured_name = name
      end

      def to_partial_path
        "pb_installer/installer"
      end

      def content
        pb_label_value = Playbook::PbLabelValue::LabelValue.new(label: "Installer") do
          icon_body_title = Playbook::PbIconBodyTitle::IconBodyTitle.new(icon: "truck", title: configured_name, link: configured_link)
          ApplicationController.renderer.render(partial: icon_body_title, as: :object)
        end
        ApplicationController.renderer.render(partial: pb_label_value, as: :object)
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
