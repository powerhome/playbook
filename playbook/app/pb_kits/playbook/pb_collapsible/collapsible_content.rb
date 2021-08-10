# frozen_string_literal: true

module Playbook
  module PbCollapsible
    class CollapsibleContent < Playbook::KitBase
      def data
        Hash(values[:data]).merge(
          collapsible_content: true
        )
      end

      def classname
        generate_classname("pb_collapsible_content_kit", "toggle-content", padding, separator: " ")
      end

      def aria_content
        { labelledby: "collapsible" }.merge! aria
      end
    end
  end
end
