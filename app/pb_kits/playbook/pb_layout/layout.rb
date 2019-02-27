module Playbook
  module PbLayout
    class Layout
      def initialize(position: default_configuration,
                   transparent: default_configuration,
                   size: default_configuration,
                   collapse: default_configuration,
                   dark: default_configuration,
                   full: default_configuration,
                   &block)
        self.configured_position = position
        self.configured_transparent = transparent
        self.configured_size = size
        self.configured_collapse = collapse
        self.configured_dark = dark
        self.configured_full = full
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

      def yield(context:)
        context.capture(&block)
      end

      def to_partial_path
        "pb_layout/layout"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor :configured_position,
          :configured_transparent,
          :configured_size,
          :configured_collapse,
          :configured_dark,
          :configured_full,
          :block
    end
  end
end
