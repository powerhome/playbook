module Playbook
  module PbList
    class ListItem

      def initialize(text: default_configuration)
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
        "pb_list/list_item"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor :configured_text
    end
  end
end
