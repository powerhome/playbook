# frozen_string_literal: true

module Playbook
  module PbHomeAddressCity
    class HomeAddressCity < Playbook::PbKit::Base
      include ActionView::Helpers::TagHelper
      include ActionView::Context

      PROPS = %i[configured_address1
                 configured_city
                 configured_classname
                 configured_dark
                 configured_data
                 configured_home_id
                 configured_house_style
                 configured_id
                 configured_state
                 configured_zip_code].freeze

      def initialize(address1: default_configuration,
                     city: default_configuration,
                     classname: default_configuration,
                     dark: default_configuration,
                     data: default_configuration,
                     home_id: default_configuration,
                     house_style: default_configuration,
                     id: default_configuration,
                     state: default_configuration,
                     zip_code: default_configuration)
        self.configured_address1 = address1
        self.configured_city = city
        self.configured_classname = classname
        self.configured_dark = dark
        self.configured_data = data
        self.configured_home_id = home_id
        self.configured_house_style = house_style
        self.configured_id = id
        self.configured_state = state
        self.configured_zip_code = zip_code
      end

      def address1
        if is_set? configured_address1
          pb_body = Playbook::PbBody::Body.new(color: "light") do
                      default_value(configured_address1, "")
                    end
          ApplicationController.renderer.render(partial: pb_body, as: :object)
        end
      end

      def city
        if is_set? configured_city
          pb_title = Playbook::PbTitle::Title.new(size: 4, text: configured_city)
          ApplicationController.renderer.render(partial: pb_title, as: :object)
        end
      end

      def dark
        is_true? configured_dark
      end

      def home_id
        if is_set? configured_home_id
          pb_body = Playbook::PbBody::Body.new(classname: "home-hashtag") do
                      default_value(configured_home_id, "")
                    end
          ApplicationController.renderer.render(partial: pb_body, as: :object)
        end
      end

      def house_style
        if is_set? configured_house_style
          pb_body = Playbook::PbBody::Body.new(color: "light") do
                      default_value(configured_house_style, "")
                    end
          ApplicationController.renderer.render(partial: pb_body, as: :object)
        end
      end

      def state
        if is_set? configured_state
          pb_title = Playbook::PbTitle::Title.new(size: 4, text: configured_state)
          ApplicationController.renderer.render(partial: pb_title, as: :object)
        end
      end

      def state_sm
        if is_set? configured_state
          pb_body = Playbook::PbBody::Body.new(color: "light", classname: "state-sm") do
            default_value(configured_state, "")
          end
          ApplicationController.renderer.render(partial: pb_body, as: :object)
        end
      end

      def zip_code
        if is_set? configured_zip_code
          pb_body = Playbook::PbBody::Body.new(color: "light") do
                      default_value(configured_zip_code, "")
                    end
          ApplicationController.renderer.render(partial: pb_body, as: :object)
        end
      end

      def to_partial_path
        "pb_home_address_city/home_address_city"
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
