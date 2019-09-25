# frozen_string_literal: true

module Playbook
  module PbList
    class ItemCheckbox < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_checkbox
                 block].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     checkbox: default_configuration,
                     &block)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_checkbox = checkbox
        self.block = block_given? ? block : nil
      end

      def to_partial_path
        "pb_list/item_checkbox"
      end

      def item_checkbox
        if is_set? configured_checkbox
          pb_checkbox = Playbook::PbCheckbox::Checkbox.new(configured_checkbox)
          ApplicationController.renderer.render(partial: pb_checkbox, as: :object)
        end
      end


      def yield(context:)
        context.capture(&block)
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
