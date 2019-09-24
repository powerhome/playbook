module Playbook
  module PbTimelineHorizontal
    class TimelineHorizontal < Playbook::PbKit::Base
      PROPS = [:configured_classname,
					:configured_data,
					:configured_id,
          :configured_icon,
          :configured_name,
          :configured_address].freeze

      def initialize(classname: default_configuration,
							data: default_configuration,
							id: default_configuration,
              icon: default_configuration,
              name: default_configuration,
              address: default_configuration)
        self.configured_classname = classname
				self.configured_data = data
				self.configured_id = id
        self.configured_icon = icon
        self.configured_name = name
        self.configured_address = address
      end

      def icon
        if is_set? configured_icon
          icon_props = { icon: configured_icon, fixed_width: true}
          pb_icon = Playbook::PbIcon::Icon.new(icon_props)
          ApplicationController.renderer.render(partial: pb_icon, as: :object)
        else
          ""
        end
      end

      def name
        if is_set? configured_name
          configured_name
        end
      end

      def address
        if is_set? configured_address
          configured_address
        end
      end

      def to_partial_path
        "pb_timeline_horizontal/timeline_horizontal"
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
