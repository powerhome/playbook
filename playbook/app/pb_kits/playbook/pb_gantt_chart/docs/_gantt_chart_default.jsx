import React from "react";
import GanttChart from '../../pb_gantt_chart/_gantt_chart'

const mockOptions = {
  title: {
    text: "Simple Gantt Chart",
  },

  xAxis: [
    {
      min: Date.UTC(2014, 10, 17),
      max: Date.UTC(2014, 10, 30),
    },
  ],

  series: [
    {
      name: "Project 1",
      data: [
        {
          name: "Start prototype",
          start: Date.UTC(2014, 10, 18),
          end: Date.UTC(2014, 10, 25),
        },
        {
          name: "Develop",
          start: Date.UTC(2014, 10, 20),
          end: Date.UTC(2014, 10, 25),
        },
        {
          name: "Run acceptance tests",
          start: Date.UTC(2014, 10, 23),
          end: Date.UTC(2014, 10, 26),
        },
        {
          name: "Test prototype",
          start: Date.UTC(2014, 10, 27),
          end: Date.UTC(2014, 10, 29),
        },
      ],
    },
  ],
};

const GanttChartDefault = (props) => (
  <div>
    <GanttChart customOptions={mockOptions} 
        {...props} 
    />
  </div>
);

export default GanttChartDefault;
