module Playbook
  module PbLabelPill
    class LabelPill < Playbook::PbKit::Base
      PROPS = [:configured_classname,
					:configured_data,
					:configured_id,
          :configured_label,
          :configured_pill_value,
          :configured_variant].freeze

      def initialize(classname: default_configuration,
							data: default_configuration,
							id: default_configuration,
              label: default_configuration,
              pill_value: default_configuration,
              variant: default_configuration
              )
        self.configured_classname = classname
				self.configured_data = data
				self.configured_id = id
        self.configured_label = label
        self.configured_pill_value = pill_value
        self.configured_variant = variant
      end

      def label
        if is_set? configured_label
          pb_caption = Playbook::PbCaption::Caption.new(text: configured_label)
        ApplicationController.renderer.render(partial: pb_caption, as: :object)
        end

      end

      def pill
        if is_set? configured_pill_value
          pb_pill = Playbook::PbPill::Pill.new(text: configured_pill_value, variant: variant)
        ApplicationController.renderer.render(partial: pb_pill, as: :object)
        end
      end

      def variant
        default_value(configured_variant, "")
      end

      def to_partial_path
        "pb_label_pill/label_pill"
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
