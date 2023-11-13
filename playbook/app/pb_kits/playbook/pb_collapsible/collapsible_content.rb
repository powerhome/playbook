# frozen_string_literal: true

module Playbook
  module PbCollapsible
    class CollapsibleContent < Playbook::KitBase
      prop :collapsed, type: Playbook::Props::Boolean,
                       default: true
      def data
        Hash(values[:data]).merge(
          collapsible_content: true
        )
      end

      def classname
        generate_classname("pb_collapsible_content_kit", "toggle-content", collapsed ? "" : "is-visible", padding, separator: " ")
      end
    end
  end
end
