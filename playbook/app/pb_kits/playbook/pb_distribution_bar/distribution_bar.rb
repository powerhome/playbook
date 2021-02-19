# frozen_string_literal: true

module Playbook
  module PbDistributionBar
    class DistributionBar < Playbook::KitBase
      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg sm],
                  default: "lg"
      prop :widths, type: Playbook::Props::NumberArray,
                  default: [1]
      prop :colors, type: Playbook::Props::Array,
                  default: []

      def classname
        generate_classname("pb_distribution_bar", size)
      end

      def widths_to_percentages
        widths.map do |width|
          (width.to_f * 100 / widths.sum).round(2)
        end
      end

      def chart_options
        {
          size: size,
          widths: widths,
          colors: colors,
        }
      end
    end
  end
end
