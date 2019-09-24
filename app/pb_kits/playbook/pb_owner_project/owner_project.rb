# frozen_string_literal: true

module Playbook
  module PbOwnerProject
    class OwnerProject < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_project_number
                 configured_name
                 configured_date].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     project_number: default_configuration,
                     name: default_configuration,
                     date: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_project_number = project_number
        self.configured_name = name
        self.configured_date = date
      end

      def to_partial_path
        "pb_owner_project/owner_project"
      end

      def project_number
        default_value(configured_project_number, "")
      end

      def name
        default_value(configured_name, "")
      end

      def date
        if is_set? configured_date
          configured_date.strftime("%m/%d")
        end
      end

      def title
        if is_set? configured_date
          pb_title = Playbook::PbTitle::Title.new(text: "#{name} &middot; #{date}".html_safe, size: 4)
        else
          pb_title = Playbook::PbTitle::Title.new(text: name, size: 4)
        end
        ApplicationController.renderer.render(partial: pb_title, as: :object)
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
