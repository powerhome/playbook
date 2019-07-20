module Playbook
  module PbIcon
    class Icon < Playbook::PbKit::Base
      PROPS = [:configured_aria,
               :configured_border,
					          :configured_classname,
					          :configured_data,
					          :configured_fixed_width,
					          :configured_flip,
					          :configured_icon,
					          :configured_id,
					          :configured_inverse,
					          :configured_list_item,
					          :configured_pull,
					          :configured_pulse,
					          :configured_rotation,
					          :configured_size,
					          :configured_spin].freeze

      def initialize(aria: default_configuration,
                     border: default_configuration,
							              classname: default_configuration,
							              data: default_configuration,
							              fixed_width: default_configuration,
							              flip: default_configuration,
							              icon: default_configuration,
							              id: default_configuration,
							              inverse: default_configuration,
							              list_item: default_configuration,
							              pull: default_configuration,
							              pulse: default_configuration,
							              rotation: default_configuration,
							              size: default_configuration,
							              spin: default_configuration)
        self.configured_aria = aria
        self.configured_border = border
				    self.configured_classname = classname
				    self.configured_data = data
				    self.configured_fixed_width = fixed_width
				    self.configured_flip = flip
				    self.configured_icon = icon
				    self.configured_id = id
				    self.configured_inverse = inverse
				    self.configured_list_item = list_item
				    self.configured_pull = pull
				    self.configured_pulse = pulse
				    self.configured_rotation = rotation
				    self.configured_size = size
				    self.configured_spin = spin
      end

      def border_class
        true_value(configured_border, "fa-border", nil)
      end

      def fixed_width_class
        true_value(configured_fixed_width, "fa-fw", nil)
      end

      def flip
        flip_options = %w(horizontal vertical both)
        one_of_value(configured_flip, flip_options, nil)
      end

      def flip_class
        h_class = "fa-flip-horizontal"
        v_class = "fa-flip-vertical"
        case self.flip
        when "horizontal"
          h_class
        when "vertical"
          v_class
        when "both"
          [h_class, v_class].join(" ")
        else
          nil
        end
      end

      def icon_class
        adjusted_value(configured_icon, "fa-#{configured_icon}", nil)
      end

      def inverse_class
        true_value(configured_inverse, "fa-inverse", nil)
      end

      def list_item_class
        true_value(configured_list_item, "fa-li", nil)
      end

      def pull
        pull_options = %w(left right)
        one_of_value(configured_pull, pull_options, default_configuration)
      end

      def pull_class
        adjusted_value(self.pull, "fa-pull-#{self.pull}", nil)
      end

      def pulse_class
        true_value(configured_pulse, "fa-pulse", nil)
      end

      def rotation
        rotation_options = [90, 180, 270]
        one_of_value(configured_rotation, rotation_options, default_configuration)
      end

      def rotation_class
        adjusted_value(self.rotation, "fa-rotate-#{self.rotation}", nil)
      end

      def size
        size_options = %w(lg xs sm 1x 2x 3x 4x 5x 6x 7x 8x 9x 10x)
        one_of_value(configured_size, size_options, default_configuration)
      end

      def size_class
        adjusted_value(self.size, "fa-#{self.size}", nil)
      end

      def spin_class
        true_value(configured_spin, "fa-spin", nil)
      end

      def kit_class
        icon_options = [
          "far",
          icon_class,
          border_class,
          fixed_width_class,
          flip_class,
          inverse_class,
          list_item_class,
          pull_class,
          pulse_class,
          rotation_class,
          size_class,
          spin_class
        ]
        icon_options.reject(&:nil?).join(" ")
      end

      def to_partial_path
        "pb_icon/icon"
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
