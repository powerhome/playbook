# frozen_string_literal: true

module Playbook
  module PbUserBadge
    class UserBadge < Playbook::PbKit::Base
      include ActionView::Helpers::AssetTagHelper

      PROPS = %i[configured_badge
                 configured_classname
                 configured_data
                 configured_id
                 configured_size].freeze

      def initialize(badge: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     size: default_configuration)
        self.configured_badge = badge
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_size = size
      end

      def display_badge
        "pb_user_badge/badges/#{badge}" if is_set? configured_badge
      end

      def kit_class
        kit_options = [
          "pb_user_badge_kit",
          size,
        ]
        kit_options.join("_")
      end

      def to_partial_path
        "pb_user_badge/user_badge"
      end

    private

      def badge
        badge_options = %w[million-dollar veteran]
        one_of_value(configured_badge, badge_options, "million-dollar")
      end

      def size
        size_options = %w[sm md lg]
        one_of_value(configured_size, size_options, "md")
      end

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
