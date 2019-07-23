# frozen_string_literal: true

module Playbook
  module PbMessage
    class Message < Playbook::PbKit::Base
      PROPS = %i[configured_avatar
                 configured_classname
                 configured_data
                 configured_id
                 configured_label
                 configured_message
                 configured_timestamp].freeze

      def initialize(avatar: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     label: default_configuration,
                     message: default_configuration,
                     timestamp: default_configuration)
        self.configured_avatar = avatar
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_label = label
        self.configured_message = message
        self.configured_timestamp = timestamp
      end

      def avatar
        if is_set? configured_avatar
          configured_avatar[:size] = "sm"
          pb_avatar = Playbook::PbAvatar::Avatar.new(configured_avatar)
          ApplicationController.renderer.render(partial: pb_avatar, as: :object)
        end
      end

      def avatar_class
        "avatar" if is_set? configured_avatar
      end

      def label
        if is_set? configured_label
          caption_props = { text: configured_label }
          pb_label = Playbook::PbCaption::Caption.new(caption_props)
          ApplicationController.renderer.render(partial: pb_label, as: :object)
        end
      end

      def message
        if is_set? configured_message
          pb_message = Playbook::PbBody::Body.new(classname: "message_text") do
            configured_message
          end
          ApplicationController.renderer.render(partial: pb_message, as: :object)
        end
      end

      def timestamp
        if is_set? configured_timestamp
          timestamp_props = { text: configured_timestamp }
          pb_timestamp = Playbook::PbTimestamp::Timestamp.new(timestamp_props)
          ApplicationController.renderer.render(partial: pb_timestamp, as: :object)
        end
      end

      def kit_class
        kit_options = [
          "pb_message",
          avatar_class,
        ]
        kit_options.compact.join("_")
      end

      def to_partial_path
        "pb_message/message"
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
