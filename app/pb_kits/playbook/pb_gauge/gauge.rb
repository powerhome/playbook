# frozen_string_literal: true

module Playbook
  module PbGauge
    class Gauge
      include Playbook::Props

      partial "pb_gauge/gauge"

      def chart_options
        {
          id: id,
          type: "gauge",
        }.to_json.html_safe
      end

      def classname
        generate_classname("pb_circle_chart")
      end
    end
  end
end
