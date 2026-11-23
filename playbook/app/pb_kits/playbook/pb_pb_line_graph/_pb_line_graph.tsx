
import React, { useMemo } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import pbLineGraphTheme from './pbLineGraphTheme'
import { mergeChartOptions } from '../utilities/highchartsOptions'
import { globalProps } from '../utilities/globalProps'


type PbLineGraphProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  id?: string,
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  options: Record<string, unknown>
  sanitizeOptions?: boolean
}

const PbLineGraph = (props: PbLineGraphProps) => {
  const {
    aria = {},
  className,
  data = {},
  id,
  htmlOptions = {},
  options,
  sanitizeOptions = false,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(buildCss('pb_pb_line_graph'), globalProps(props), className)
  
  const mergedOptions = useMemo(() => {
    if (!options || typeof options !== "object") {
      // eslint-disable-next-line no-console
      console.error("❌ Invalid options passed to <PbLineGraph />", options)
      return mergeChartOptions({}, {})
    }

    return mergeChartOptions(pbLineGraphTheme, options, sanitizeOptions)
  }, [options, sanitizeOptions])
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

export default PbLineGraph
