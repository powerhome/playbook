import React, { useMemo } from "react"
import { buildDataProps } from "../utilities/props";
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

import pbBarGraphTheme from "./pbBarGraphTheme"

type PbBarGraphProps = {
  options: Record<string, unknown>
  containerProps?: React.HTMLProps<HTMLDivElement>
  data?: Record<string, unknown>
}

const PbBarGraph = ({
  options,
  containerProps = {},
  data = {}
}: PbBarGraphProps): React.ReactElement => {

  const dataProps = buildDataProps(data)

  const mergedOptions = useMemo(() => {
    if (!options || typeof options !== "object") {
      // eslint-disable-next-line no-console
      console.error("❌ Invalid options passed to <BarGraph />", options)
      return {}
    }

    return Highcharts.merge({}, pbBarGraphTheme, options)
  }, [options])

  return (
  
    <div>
      <HighchartsReact
          containerProps={{ ...containerProps, ...dataProps }}
          highcharts={Highcharts}
          options={mergedOptions}
      />
    </div>
  )
}

export default PbBarGraph
