
import React, { useMemo } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import pbCircleGraphTheme from './pbCircleChartTheme'
import { globalProps } from '../utilities/globalProps'

type PbCircleChartProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  id?: string,
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  options: Record<string, unknown>
}

const PbCircleChart = (props: PbCircleChartProps) => {
  const {
    aria = {},
  className,
  data = {},
  id,
  htmlOptions = {},
  options
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(buildCss('pb_pb_circle_chart'), globalProps(props), className)

  const mergedOptions = useMemo(() => {
    if (!options || typeof options !== "object") {
      // eslint-disable-next-line no-console
      console.error("❌ Invalid options passed to <PbCircleChart />", options)
      return {}
    }

    return Highcharts.merge({}, pbCircleGraphTheme, options)
  }, [options])

  return (

    <div>
      <HighchartsReact
          containerProps={{
                  className: classnames(globalProps, className),
                  id: id,
                  ...ariaProps,
                  ...dataProps,
                  ...htmlProps
                }}
          highcharts={Highcharts}
          options={mergedOptions}
      />
    </div>
  )
}

export default PbCircleChart
