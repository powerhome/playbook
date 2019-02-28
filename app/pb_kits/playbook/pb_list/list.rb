module Playbook
  module PbList
    class List
      def initialize(class: default_configuration,
                      dark: default_configuration,
                      ordered: default_configuration,
                      borderless: default_configuration,
                      lg: default_configuration,
                      xpadding: default_configuration,
                      layout: default_configuration,
                    &block)
        self.configured_class = default_configuration
        self.configured_dark = dark
        self.configured_ordered = ordered
        self.configured_borderless = borderless
        self.configured_lg = lg
        self.configured_xpadding = xpadding
        self.configured_layout = layout
        self.block = block_given? ? block : nil
      end


      def class
        if configured_class == default_configuration
          ""
        else
          configured_class
        end
      end

      def dark
        if configured_dark == default_configuration
          ""
        elsif(configured_dark == true)
            "_dark"
        end
      end

      def layout
        if configured_layout == default_configuration
          ""
        elsif(configured_layout == "left")
            "_layout_left"
        elsif(configured_layout == "right")
              "_layout_right"
        end
      end

      def lg
        if configured_lg == default_configuration
          ""
        elsif(configured_lg == true)
          "_lg"
        end
      end

      def ordered
        if configured_ordered == false
          "ul"
        else
          "ol"
        end
      end

      def xpadding
        if configured_xpadding == default_configuration
          ""
        elsif(configured_xpadding == true)
            "_xpadding"
        end
      end


      def borderless
        if configured_borderless == false
          ""
        else
          "_borderless"
        end
      end

      def yield(context:)
        context.capture(&block)
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
      attr_accessor :configured_class,
      :configured_dark,
      :configured_ordered,
      :configured_borderless,
      :configured_lg,
      :configured_xpadding,
      :configured_layout,
      :block
    end
  end
end
