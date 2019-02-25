module Playbook
  module PbList
    class List
      def initialize(class: default_configuration)
        self.configured_class = default_configuration
      end


      def class
        if configured_class == default_configuration
          ""
        else
          configured_class
        end
      end

      def to_partial_path
        "pb_list/list"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor :configured_class
    end
  end
end
