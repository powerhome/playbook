# frozen_string_literal: true

module Playbook
  module PbUser
    class User < Playbook::PbKit::Base
      PROPS = %i[configured_align
                 configured_avatar
                 configured_classname
                 configured_data
                 configured_id
                 configured_name
                 configured_orientation
                 configured_size
                 configured_title].freeze

      def initialize(align: default_configuration,
                     avatar: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     name: default_configuration,
                     orientation: default_configuration,
                     size: default_configuration,
                     title: default_configuration)
        self.configured_align = align
        self.configured_avatar = avatar
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_name = name
        self.configured_orientation = orientation
        self.configured_size = size
        self.configured_title = title
      end

      def align
        align_options = %w[left center right]
        one_of_value(configured_align, align_options, "left")
      end

      def avatar_size
        case size
        when "lg"
          "xl"
        when "md"
          "md"
        else
          "sm"
        end
      end

      def avatar
        if is_set? configured_avatar
          avatar_obj = configured_avatar == true ? {} : configured_avatar
          avatar_obj[:size] = avatar_size
          avatar_obj[:name] = configured_name if is_set? configured_name
          pb_avatar = Playbook::PbAvatar::Avatar.new(avatar_obj)
          ApplicationController.renderer.render(partial: pb_avatar, as: :object)
        end
      end

      def name_size
        size == "lg" ? 3 : 4
      end

      def name
        if is_set? configured_name
          title_props = { text: configured_name, size: name_size }
          pb_name = Playbook::PbTitle::Title.new(title_props)
          ApplicationController.renderer.render(partial: pb_name, as: :object)
        end
      end

      def orientation
        orientation_options = %w[vertical horizontal]
        one_of_value(configured_orientation, orientation_options, "horizontal")
      end

      def size
        size_options = %w[lg md sm]
        one_of_value(configured_size, size_options, "sm")
      end

      def title
        if is_set? configured_title
          pb_icon_element = Playbook::PbBody::Body.new(color: "light") do
            configured_title
          end
          ApplicationController.renderer.render(partial: pb_icon_element, as: :object)
        end
      end

      def kit_class
        kit_options = [
          "pb_user_kit",
          align,
          orientation,
          size,
        ]
        kit_options.join("_")
      end

      def to_partial_path
        "pb_user/user"
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
