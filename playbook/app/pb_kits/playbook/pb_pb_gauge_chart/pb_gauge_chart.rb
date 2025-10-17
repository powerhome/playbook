# frozen_string_literal: true

module Playbook
  module PbPbGaugeChart
    class PbGaugeChart < ::Playbook::KitBase
      prop :options, default: {}

      def react_props
        {
          className: classname,
          data: data,
          options: options,
          id: id,
        }
      end

      def classname
        # Highcharts react needs classname attached to the container div,
        # we pass an empty string here to avoid conflicts, classname is built in the TSX
        # We still need generate_classnames to retain ability to pass in custom classnames or global props
        generate_classname("")
      end
    end
  end
end
