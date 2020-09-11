# frozen_string_literal: true

module Playbook
  module PbCollapsible
    class Collapsible
      include Playbook::Props

      partial "pb_collapsible/collapsible"

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
