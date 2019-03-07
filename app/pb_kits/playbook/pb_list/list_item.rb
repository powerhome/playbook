module Playbook
  module PbList
    class ListItem
      PROPS = [:configured_text].freeze


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

      def self.options
        new_hash = PROPS.map { |e| e.to_s.remove("configured_") }
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
      attr_accessor(*PROPS)
    end
  end
end
