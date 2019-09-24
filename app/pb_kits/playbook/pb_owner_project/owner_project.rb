# frozen_string_literal: true

module Playbook
  module PbOwnerProject
    class OwnerProject < Playbook::PbKit::Base
      include ActionView::Helpers::TagHelper
      include ActionView::Context

      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_project_number
                 configured_name
                 configured_date
                 configured_link].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     project_number: default_configuration,
                     name: default_configuration,
                     date: default_configuration,
                     link: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_project_number = project_number
        self.configured_name = name
        self.configured_date = date
        self.configured_link = link
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

      def display_title
        if is_set? configured_link
          content_tag(:a, href: configured_link, class: "pb_owner_project_link_title") do
            title
          end
        else
          content_tag(:span) do
            title
          end
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
