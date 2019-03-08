module Playbook
  module PbLayout
    class Layout
      PROPS = [:configured_classname,
        :configured_collapse,
        :configured_dark,
        :configured_data,
        :configured_full,
        :configured_id,
        :configured_position,
        :configured_transparent,
        :configured_size,
        :block].freeze

      def initialize(classname: default_configuration,
                   collapse: default_configuration,
                   dark: default_configuration,
                   data: default_configuration,
                   full: default_configuration,
                   id: default_configuration,
                   position: default_configuration,
                   transparent: default_configuration,
                   size: default_configuration,
                   &block)
        self.configured_classname = classname
        self.configured_collapse = collapse
        self.configured_dark = dark
        self.configured_data = data
        self.configured_full = full
        self.configured_id = id
        self.configured_position = position
        self.configured_transparent = transparent
        self.configured_size = size
        self.block = block_given? ? block : nil
      end

      def position
        if configured_position == default_configuration
          "_left"
        else
          "_#{configured_position}"
        end
      end

      def transparent
        if configured_transparent == default_configuration
          ""
        else
          if (configured_transparent == true)
            "_transparent"
          end
        end
      end

      def size
        if configured_size == default_configuration
          "md"
        else
          configured_size
        end
      end

      def collapse
        if configured_collapse == default_configuration
          " layout#{self.position}_collapse_xs"
        else
          " layout#{self.position}_collapse_#{configured_collapse}"
        end
      end

      def full
        if configured_full == default_configuration
          ""
        else
          if (configured_full == true)
            " full"
          end
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

      def yield(context:)
        context.capture(&block)
      end

      def to_partial_path
        "pb_layout/layout"
      end

      def self.options
        options = PROPS.map { |e| e.to_s.remove("configured_") }
        options = options.sort
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
