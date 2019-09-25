# frozen_string_literal: true

module Playbook
  module PbSelectableCard
    class SelectableCard < Playbook::PbKit::Base
      PROPS = %i[configured_checked
                 configured_classname
                 configured_data
                 configured_disabled
                 configured_id
                 configured_name
                 configured_show_selected
                 configured_show_unselected
                 configured_text
                 configured_value].freeze

      def initialize(checked: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     disabled: default_configuration,
                     id: default_configuration,
                     name: default_configuration,
                     show_selected: default_configuration,
                     show_unselected: default_configuration,
                     text: default_configuration,
                     value: default_configuration)
        self.configured_checked = checked
        self.configured_classname = classname
        self.configured_data = data
        self.configured_disabled = disabled
        self.configured_id = id
        self.configured_name = name
        self.configured_show_selected = show_selected
        self.configured_show_unselected = show_unselected
        self.configured_text = text
        self.configured_value = value
      end

      def checked
        true_value(configured_checked, "true value", "false value")
      end

      def disabled
        true_value(configured_disabled, "true value", "false value")
      end

      def name
        default_value(configured_name, "")
      end

      def show_selected
        true_value(configured_show_selected, "true value", "false value")
      end

      def show_unselected
        true_value(configured_show_unselected, "true value", "false value")
      end

      def text
        default_value(configured_text, "")
      end

      def value
        default_value(configured_value, "")
      end

      def to_partial_path
        "pb_selectable_card/selectable_card"
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
