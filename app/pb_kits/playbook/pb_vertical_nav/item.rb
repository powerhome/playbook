module Playbook
  module PbVerticalNav
    class Item
      PROPS = [:configured_active,
          :configured_classname,
          :configured_data,
          :configured_id,
          :configured_link,
          :configured_text].freeze

      def initialize(active: default_configuration,
                   classname: default_configuration,
                   data: default_configuration,
                   id: default_configuration,
                   link: default_configuration,
                   text: default_configuration)
        self.configured_active = active
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_link = link
        self.configured_text = text
      end

      def active
        if configured_active == default_configuration
          ""
        else
          if (configured_active == true)
            "_active"
          end
        end
      end

      def link
        if configured_link == default_configuration
          "#"
        else
          configured_link
        end
      end

      def text
        if configured_text == default_configuration
          ""
        else
          configured_text
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
        "pb_vertical_nav/item"
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
