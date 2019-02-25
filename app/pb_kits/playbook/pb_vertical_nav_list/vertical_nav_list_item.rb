module Playbook
  module PbVerticalNavList
    class VerticalNavListItem
      def initialize(active: default_configuration,
                   text: default_configuration,
                   link: default_configuration)
        self.configured_active = active
        self.configured_text = text
        self.configured_link = link
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

      def to_partial_path
        "pb_vertical_nav_list/vertical_nav_list_item"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor :configured_link,
          :configured_text,
          :configured_active
    end
  end
end
