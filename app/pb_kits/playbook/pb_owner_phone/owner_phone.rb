module Playbook
  module PbOwnerPhone
    class OwnerPhone < Playbook::PbKit::Base
      PROPS = [:configured_classname,
					:configured_data,
					:configured_id,
          :configured_name,
          :configured_number,
          :configured_icon].freeze

      def initialize(classname: default_configuration,
							data: default_configuration,
							id: default_configuration,
              name: default_configuration,
              number: default_configuration,
              icon: default_configuration)
        self.configured_classname = classname
				self.configured_data = data
				self.configured_id = id
        self.configured_name = name
        self.configured_number = number
        self.configured_icon = icon
      end

      def icon
       if is_set? configured_icon
          icon_props = { icon: configured_icon, fixed_width: true }
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

      def number
        if is_set? configured_number
          configured_number
        end
      end

      def to_partial_path
        "pb_owner_phone/owner_phone"
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
