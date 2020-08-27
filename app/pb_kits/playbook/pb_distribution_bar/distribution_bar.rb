# frozen_string_literal: true

module Playbook
  module PbDistributionBar
    class DistributionBar
      include Playbook::Props

      partial "pb_distribution_bar/distribution_bar"

      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg sm],
                  default: "lg"
      prop :widths, type: Playbook::Props::NumberArray,
                    default: [1]

      def classname
        generate_classname("pb_distribution_bar", size)
      end

      def widths_to_percentages
        widths.map do |width|
          (width.to_f * 100 / widths.sum).round(2)
        end
      end
    end
  end
end
