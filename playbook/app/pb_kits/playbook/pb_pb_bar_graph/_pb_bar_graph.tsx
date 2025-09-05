import React, { useMemo } from "react"
import { globalProps } from "../utilities/globalProps";
import { buildAriaProps, buildDataProps, buildHtmlProps } from "../utilities/props";
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

import pbBarGraphTheme from "./pbBarGraphTheme"

import classnames from "classnames";

type PbBarGraphProps = {
  
  options: Record<string, unknown>
  className?: string
  aria?: { [key: string]: string };
  data?: { [key: string]: string };
  id: string;
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)};
}

const PbBarGraph = ({
  aria = {},
  data = {},
  id,
  htmlOptions = {},
  options,
  className = "pb_pb_bar_graph",
}: PbBarGraphProps): React.ReactElement => {

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);

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

export default PbBarGraph
