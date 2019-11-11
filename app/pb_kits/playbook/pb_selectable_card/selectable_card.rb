# frozen_string_literal: true

module Playbook
  module PbSelectableCard
    class SelectableCard < Playbook::PbKit::Base
      PROPS = %i[configured_checked
                 configured_classname
                 configured_dark
                 configured_data
                 configured_disabled
                 configured_icon
                 configured_id
                 configured_multi
                 configured_name
                 configured_show_selected
                 configured_show_unselected
                 configured_text
                 configured_value
                 block].freeze

      def initialize(checked: default_configuration,
                     classname: default_configuration,
                     dark: default_configuration,
                     data: default_configuration,
                     disabled: default_configuration,
                     icon: default_configuration,
                     id: default_configuration,
                     multi: default_configuration,
                     name: default_configuration,
                     show_selected: default_configuration,
                     show_unselected: default_configuration,
                     text: default_configuration,
                     value: default_configuration,
                     &block)
        self.configured_checked = checked
        self.configured_classname = classname
        self.configured_dark = dark
        self.configured_data = data
        self.configured_disabled = disabled
        self.configured_icon = icon
        self.configured_id = id
        self.configured_multi = multi
        self.configured_name = name
        self.configured_show_selected = show_selected
        self.configured_show_unselected = show_unselected
        self.configured_text = text
        self.configured_value = value
        self.block = block_given? ? block : nil
      end

      def checked
        true_value(configured_checked, true, false)
      end

      def dark
        true_value(configured_dark, true, false)
      end

      def disabled
        true_value(configured_disabled, true, false)
      end

      def icon
        is_true? configured_icon
      end

      def multi
        if is_set?(configured_multi)
          true_value(configured_multi, true, false)
        else
          true
        end
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

      def yield(context:)
        !block.nil? ? context.capture(&block) : text
      end

      def dark_class
        true_value(dark, "dark", "")
      end

      def disabled_class
        true_value(disabled, "disabled", "enabled")
      end

      def kit_class
        kit_options = [
          "pb_selectable_card_kit",
          dark_class,
          disabled_class,
        ]
        kit_options.compact.join("_")
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
