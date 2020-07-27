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

      def chart_options
        {
          size: size,
          widths: widths,
        }
      end
    end
  end
end
