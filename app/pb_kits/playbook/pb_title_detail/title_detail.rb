# frozen_string_literal: true

module Playbook
  module PbTitleDetail
    class TitleDetail < Playbook::PbKit::Base
      PROPS = %i[configured_align
                 configured_classname
                 configured_data
                 configured_detail
                 configured_id
                 configured_title].freeze

      def initialize(align: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     detail: default_configuration,
                     id: default_configuration,
                     title: default_configuration)
        self.configured_align = align
        self.configured_classname = classname
        self.configured_data = data
        self.configured_detail = detail
        self.configured_id = id
        self.configured_title = title
      end

      def align
        align_options = %w[left center right]
        one_of_value(configured_align, align_options, "left")
      end

      def title
        if is_set? configured_title
          pb_title = Playbook::PbTitle::Title.new(size: 4, text: configured_title)
          ApplicationController.renderer.render(partial: pb_title, as: :object)
        end
      end

      def detail
        if is_set? configured_detail
          pb_detail = Playbook::PbBody::Body.new(color: "light") do
            configured_detail
          end
          ApplicationController.renderer.render(partial: pb_detail, as: :object)
        end
      end

      def kit_class
        kit_options = [
          "pb_title_detail",
          align,
        ]
        kit_options.join("_")
      end

      def to_partial_path
        "pb_title_detail/title_detail"
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
