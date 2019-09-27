# frozen_string_literal: true

module Playbook
  module PbSelectableIcon
    class SelectableIcon < Playbook::PbKit::Base
      include ActionView::Helpers::FormTagHelper
      include ActionView::Context

      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_label
                 configured_select
                 configured_icon
                 configured_name
                 configured_value
                 configured_checked
                 block].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     label: default_configuration,
                     select: default_configuration,
                     icon: default_configuration,
                     name: default_configuration,
                     value: default_configuration,
                     checked: default_configuration,
                     &block)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_label = label
        self.configured_select = select
        self.configured_icon = icon
        self.configured_name = name
        self.configured_value = value
        self.configured_checked = checked
        self.block = block_given? ? block : nil
      end

      def icon
        if is_set? configured_icon
          icon_props = { icon: configured_icon, fixed_width: true, size: "2x", classname: "pb_selectable_icon_kit_icon"}
          pb_icon = Playbook::PbIcon::Icon.new(icon_props)
          ApplicationController.renderer.render(partial: pb_icon, as: :object)
        else
          ""
        end
      end

      def label
        if is_set? configured_label
          pb_label = Playbook::PbTitle::Title.new(text: configured_label, size: 4, classname: "pb_selectable_icon_kit_title")
          ApplicationController.renderer.render(partial: pb_label, as: :object)
        end
      end

      def yield(context:)
        !block.nil? ? context.capture(&block) : input
      end

      def kit_class
        class_options = [
          "pb_selectable_icon_kit",
          checked_class,
        ]
        class_options.join("_")
      end

      def to_partial_path
        "pb_selectable_icon/selectable_icon"
      end

    private

      def input
        checked = is_true? configured_checked
        check_box_tag(name, value, checked)
      end

      def name
        configured_name if is_set? configured_name
      end

      def value
        configured_value if is_set? configured_value
      end

      def checked_class
        configured_checked ? "checked" : "unchecked"
      end

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
