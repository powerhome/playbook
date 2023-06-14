# frozen_string_literal: true

module Playbook
  module PbDetail
    class Detail < ::Playbook::KitBase
      prop :bold, type: Playbook::Props::Boolean,
                  default: false
      prop :color, type: Playbook::Props::Enum,
                   values: %w[light default lighter link error success],
                   default: "light"
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p span div],
                 default: "div"
      prop :text

      def classname
        "#{generate_classname('pb_detail_kit', color)}#{is_bold}"
      end

      def content
        super.presence || text
      end

    private

      def is_bold
        bold ? " bold" : ""
      end
    end
  end
end
