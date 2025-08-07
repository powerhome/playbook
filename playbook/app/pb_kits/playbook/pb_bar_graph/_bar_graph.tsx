import React, { useMemo } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

import barGraphTheme from "./barGraphTheme"

type BarGraphProps = {
  options: Record<string, unknown>
  containerProps?: React.HTMLProps<HTMLDivElement>
}

const BarGraph = ({
  options,
  containerProps = {},
}: BarGraphProps): React.ReactElement => {

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
        containerProps={containerProps}
        highcharts={Highcharts}
        options={mergedOptions}
    />
  )
}

export default BarGraph