
import React, { useMemo } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import pbGaugeGraphTheme from './pbGaugeGraphTheme'
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import { globalProps } from '../utilities/globalProps'

type PbGaugeChartProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) | ((arg?: Event) => void) },
  id?: string,
  options: Record<string, unknown>
}

const PbGaugeChart = (props: PbGaugeChartProps) => {
  const {
    aria = {},
  className,
  data = {},
  htmlOptions = {},
  id,
  options = {},
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(buildCss('pb_pb_gauge_chart'), globalProps(props), className)

  const mergedOptions = useMemo(() => {
    if (!options || typeof options !== "object") {
      // eslint-disable-next-line no-console
      console.error("❌ Invalid options passed to <PbLineGraph />", options)
      return {}
    }

    return Highcharts.merge({}, pbGaugeGraphTheme, options)
  }, [options])

  highchartsMore(Highcharts);
  solidGauge(Highcharts);

  return (
    <div>
        <HighchartsReact
            containerProps={{
                    className: classnames(classes),
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

export default PbGaugeChart
