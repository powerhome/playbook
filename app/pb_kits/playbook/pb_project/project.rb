# frozen_string_literal: true

module Playbook
  module PbProject
    class Project < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_date
                 configured_id
                 configured_link
                 configured_owner_name
                 configured_project_number].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     date: nil,
                     id: default_configuration,
                     link: nil,
                     owner_name: default_configuration,
                     project_number: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_date = date
        self.configured_id = id
        self.configured_link = link
        self.configured_owner_name = owner_name
        self.configured_project_number = project_number
      end

      def title
        title = owner_name
        title += " &middot; #{formatted_date}" if configured_date
        title.html_safe
      end

      def formatted_date
        configured_date.respond_to?(:strftime) ? configured_date.strftime("%m/%d") : configured_date.to_s
      end

      def owner_name
        default_value(configured_owner_name, "")
      end

      def project_number
        default_value(configured_project_number, "")
      end

      def to_partial_path
        "pb_project/project"
      end

      def content
        pb_label_value = Playbook::PbLabelValue::LabelValue.new(label: "Project") do
          icon_body_title = Playbook::PbIconBodyTitle::IconBodyTitle.new(icon: "home", body: project_number, title: title, link: configured_link)
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
