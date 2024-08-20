
import React, {useState, useEffect} from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts-gantt";

import { highchartsTheme } from "../pb_dashboard/pbChartsLightTheme";
import { highchartsDarkTheme } from "../pb_dashboard/pbChartsDarkTheme";

type GanttChartProps = {
  aria?: { [key: string]: string },
  chartData: { name: string; data: number[], yAxis: number }[],
  className?: string,
  customOptions?: Partial<Highcharts.Options>,
  dark?: boolean,
  data?: { [key: string]: string },
  id?: string,
}

const GanttChart = (props: GanttChartProps) => {
  const {
  aria = {},
  chartData,
  className,
  customOptions = {},
  dark = false,
  data = {},
  id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_gantt_chart'), globalProps(props), className)

  const mockOptions = {
    title: {
      text: 'Simple Gantt Chart'
    },
  
    xAxis: [{
      min: Date.UTC(2014, 10, 17),
      max: Date.UTC(2014, 10, 30)
    }],
  
    series: [{
      name: 'Project 1',
      data: [{
        name: 'Start prototype',
        start: Date.UTC(2014, 10, 18),
        end: Date.UTC(2014, 10, 25)
      }, {
        name: 'Develop',
        start: Date.UTC(2014, 10, 20),
        end: Date.UTC(2014, 10, 25)
      }, {
        name: 'Run acceptance tests',
        start: Date.UTC(2014, 10, 23),
        end: Date.UTC(2014, 10, 26)
      }, {
        name: 'Test prototype',
        start: Date.UTC(2014, 10, 27),
        end: Date.UTC(2014, 10, 29)
      }]
    }]
  }

  const [options, setOptions] = useState(mockOptions);


  // useEffect(() => {
    // setOptions(customOptions);
  // }, [customOptions]);

  const setupTheme = () => {
    dark
      ? Highcharts.setOptions(highchartsDarkTheme)
      : Highcharts.setOptions(highchartsTheme);
  };
  setupTheme();


  return (
    <div>
    <HighchartsReact
        constructorType={"ganttChart"}
        containerProps={{
          className: classnames(globalProps(props), classes),
          id: id,
          ...ariaProps,
          ...dataProps,
        }}
        highcharts={Highcharts}
        options={options}
    />
    </div>
  )
}

export default GanttChart
