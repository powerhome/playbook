module Playbook
  module PbTitle
    class Title
      PROPS = [:configured_classname,
          :configured_dark,
          :configured_data,
          :configured_id,
          :configured_size,
          :configured_tag,
          :configured_text].freeze

      def initialize(classname: default_configuration,
                   dark: default_configuration,
                   data: default_configuration,
                   id: default_configuration,
                   size: default_configuration,
                   tag: default_configuration,
                   text: default_configuration)
        self.configured_classname = classname
        self.configured_dark = dark
        self.configured_data = data
        self.configured_id = id
        self.configured_size = size
        self.configured_tag = tag
        self.configured_text = text
      end

      def tag
        if configured_tag == default_configuration
          "h1"
        else
          configured_tag
        end
      end

      def text
        if configured_text == default_configuration
          "Hello World"
        else
          configured_text
        end
      end

      def size
        if configured_size == default_configuration
          "_1"
        else
          "_#{configured_size}"
        end
      end

      def dark
        if configured_dark == default_configuration
          ""
        else
          if (configured_dark == true)
            "_dark"
          end
        end
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
        "pb_title/title"
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
