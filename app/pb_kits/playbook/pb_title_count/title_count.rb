# frozen_string_literal: true

module Playbook
  module PbTitleCount
    class TitleCount < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_count
                 configured_data
                 configured_id
                 configured_size
                 configured_title].freeze

      def initialize(classname: default_configuration,
                     count: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     size: default_configuration,
                     title: default_configuration)
        self.configured_classname = classname
        self.configured_count = count
        self.configured_data = data
        self.configured_id = id
        self.configured_size = size
        self.configured_title = title
      end

      def size
        size_options = %w[lg sm]
        one_of_value(configured_size, size_options, "sm")
      end

      def title_size
        size == "lg" ? 3 : 4
      end

      def title
        if is_set? configured_title
          pb_title = Playbook::PbTitle::Title.new(size: title_size, text: configured_title)
          ApplicationController.renderer.render(partial: pb_title, as: :object)
        end
      end

      def count
        if is_set? configured_count
          value = configured_count.is_a?(Integer) ? format_number(configured_count) : configured_count
          pb_count = Playbook::PbBody::Body.new(color: "light") do
            value.to_s
          end
          ApplicationController.renderer.render(partial: pb_count, as: :object)
        end
      end

      def format_number(n)
        n.to_s.reverse.gsub(/...(?=.)/,'\&,').reverse
      end

      def kit_class
        "pb_title_count"
      end

      def to_partial_path
        "pb_title_count/title_count"
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
