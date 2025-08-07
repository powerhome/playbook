import React, { useMemo } from "react"
import { buildAriaProps, buildDataProps, buildHtmlProps } from "../utilities/props";
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

import barGraphTheme from "./barGraphTheme"

type BarGraphProps = {
  options: Record<string, unknown>
  containerProps?: React.HTMLProps<HTMLDivElement>
  data?: Record<string, unknown>
}

const BarGraph = ({
  options,
  containerProps = {},
  data = {}
}: BarGraphProps): React.ReactElement => {

  const dataProps = buildDataProps(data)

  const mergedOptions = useMemo(() => {
    if (!options || typeof options !== "object") {
      // eslint-disable-next-line no-console
      console.error("❌ Invalid options passed to <BarGraph />", options)
      return {}
    }

    return Highcharts.merge({}, barGraphTheme, options)
  }, [options])

  return (
    <HighchartsReact
        containerProps={{ ...containerProps, ...dataProps }}
        highcharts={Highcharts}
        options={mergedOptions}
    />
  )
}

export default BarGraph