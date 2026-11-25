import React, { useMemo } from "react"
import { globalProps } from "../utilities/globalProps";
import { buildAriaProps, buildDataProps, buildCss, buildHtmlProps } from "../utilities/props";
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

import pbBarGraphTheme from "./pbBarGraphTheme"
import { mergeChartOptions } from "../utilities/highchartsOptions"

import classnames from "classnames";

type PbBarGraphProps = {
  
  options: Record<string, unknown>
  sanitizeOptions?: boolean
  className?: string
  aria?: { [key: string]: string };
  data?: { [key: string]: string };
  id: string;
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)};
}

const PbBarGraph = ( props: PbBarGraphProps): React.ReactElement => {
const {
  aria = {},
  data = {},
  id,
  htmlOptions = {},
  options,
  sanitizeOptions = false,
  className,
} = props

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(buildCss('pb_pb_bar_graph'), globalProps(props), className)

  const mergedOptions = useMemo(() => {
    if (!options || typeof options !== "object") {
      // eslint-disable-next-line no-console
      console.error("❌ Invalid options passed to <PbBarGraph />", options)
      return mergeChartOptions({}, {})
    }

    return mergeChartOptions(pbBarGraphTheme, options, sanitizeOptions)
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

export default PbBarGraph
