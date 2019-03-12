module Playbook
  module PbList
    class Item < Playbook::PbKit::Base
      PROPS = [:configured_classname,
          :configured_data,
          :configured_id,
          :configured_text].freeze

      def initialize(classname: default_configuration,
                   data: default_configuration,
                   id: default_configuration,
                   text: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_text = text
      end

      def text
        if configured_text == default_configuration
          "List item"
        else
          configured_text
        end
      end

      def to_partial_path
        "pb_list/item"
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
