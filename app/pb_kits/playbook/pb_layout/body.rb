module Playbook
  module PbLayout
    class Body
      PROPS = [:configured_classname,
          :configured_data,
          :configured_id,
          :block].freeze

      def initialize(classname: default_configuration,
                  data: default_configuration,
                  id: default_configuration,
                  &block)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.block = block_given? ? block : nil
      end

      def yield(context:)
        context.capture(&block)
      end

      def classname(ui_classes="")
        if configured_classname == default_configuration
          ui_classes
        else
          ui_classes+" "+configured_classname
        end
      end

      def data(ui_data={})
        ui_data ||= {}
        if configured_data == default_configuration
          ui_data
        else
          configured_data.merge(ui_data)
        end
      end

      def id(ui_id=nil)
        if configured_id == default_configuration
          ui_id
        else
          configured_id
        end
      end

      def to_partial_path
        "pb_layout/body"
      end

      def self.options
        PROPS.map { |e| e.to_s.remove("configured_") }
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
