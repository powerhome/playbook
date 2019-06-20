module Playbook
  module PbPeanut
    class Peanut < Playbook::PbKit::Base
      PROPS = [:configured_classname,
          :configured_data,
          :configured_id,
          :configured_title,
          :configured_selected,
          :configured_subtext].freeze

      def initialize(classname: default_configuration,
                   data: default_configuration,
                   id: default_configuration,
                   title: default_configuration,
                   selected: default_configuration,
                   subtext: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_title = title
        self.configured_selected = selected
        self.configured_subtext = subtext
      end

      def title
        if configured_title == default_configuration
          "Enter title"
        else
          configured_title
        end
      end

      def selected
        if configured_selected == default_configuration
          false
        else
          configured_selected
        end
      end

      def subtext
        if configured_subtext == default_configuration
          ""
        else
          configured_subtext
        end
      end

      def to_partial_path
        "pb_peanut/peanut"
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
