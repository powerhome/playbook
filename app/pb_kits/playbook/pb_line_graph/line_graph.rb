module Playbook
  module PbLineGraph
    class LineGraph
      PROPS = [:configured_class,
          :configured_text].freeze

      def initialize(class_name: default_configuration,
                    text: default_configuration)
        self.configured_class = class_name
        self.configured_text = text
      end


      def class_name
        if configured_class == default_configuration
          ""
        else
          configured_class
        end
      end

      def text
        if configured_text == default_configuration
          "I am a rails kit"
        else
          configured_text
        end
      end

      def to_partial_path
        "pb_line_graph/line_graph"
      end

      def self.options
        new_hash = PROPS.map { |e| e.to_s.remove("configured_") }
      end

      def js
        js = <<JS

Highcharts.chart('mychart', {

    title: {
        text: 'Solar Employment Growth by Sector, 2010-2016'
    },

    subtitle: {
        text: 'Source: thesolarfoundation.com'
    },

    yAxis: {
        title: {
            text: 'Number of Employees'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
JS

        js.html_safe
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
