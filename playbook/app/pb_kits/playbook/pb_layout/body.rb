# frozen_string_literal: true

module Playbook
  module PbLayout
    class Body < Playbook::KitBase
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[ul li span div],
                 default: "div"
      prop :row_gap, type: Playbook::Props::Enum,
                     values: %w[xs sm md lg xl],
                     default: "md"
      prop :column_gap, type: Playbook::Props::Enum,
                        values: %w[xs sm md lg xl],
                        default: "md"

      def classname
        generate_classname("layout_body row_gap_#{row_gap} column_gap_#{column_gap}")
      end
    end
  end
end
