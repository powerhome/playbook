# frozen_string_literal: true

module Playbook
  module PbHashtag
    class Hashtag < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_text
                 configured_type
                 configured_url].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     text: default_configuration,
                     type: default_configuration,
                     url: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_text = text
        self.configured_type = type
        self.configured_url = url
      end

      def type
        type_options = %w[default project home]
        set_type = one_of_value(configured_type, type_options, "default")
        if set_type === "home"
          "H#"
        elsif set_type === "project"
          "P#"
        else
          "#"
        end
      end

      def hashtag
        pb_hashtag = Playbook::PbBadge::Badge.new(text: hashtag_value, variant: "primary")
        ApplicationController.renderer.render(partial: pb_hashtag, as: :object)
      end

      def hashtag_value
        text = default_value(configured_text, "")
        type + text
      end

      def url
        default_value(configured_url, "")
      end

      def kit_class
        kit_options = [
          "pb_hashtag_kit",
          type,
        ]
        kit_options.join("_")
      end


      def to_partial_path
        "pb_hashtag/hashtag"
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
