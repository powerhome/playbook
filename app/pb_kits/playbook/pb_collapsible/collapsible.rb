# frozen_string_literal: true

module Playbook
  module PbCollapsible
    class Collapsible
      include Playbook::Props

      partial "pb_collapsible/collapsible"

      prop :name

      def classname
        generate_classname("pb_collapsible_kit")
      end

      def body_padding
        if padding.present?
          ""
        else
          "p_md"
        end
      end
    end
  end
end
