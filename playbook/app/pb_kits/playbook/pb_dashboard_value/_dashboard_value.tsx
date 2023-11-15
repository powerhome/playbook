import React from "react"
import classnames from "classnames"
import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props"
import { globalProps } from "../utilities/globalProps"

import Body from "../pb_body/_body"
import StatChange from "../pb_stat_change/_stat_change"
import StatValue from "../pb_stat_value/_stat_value"

type DashboardValueProps = {
  align?: "left" | "center" | "right"
  aria?: { [key: string]: string }
  className?: string
  data?: { [key: string]: string }
  id?: string
  statChange?: {
    change?: "increase" | "decrease" | "neutral"
    value?: string | number
  }
  statLabel?: string
  statValue?: {
    unit?: string
    value?: string | number
  }
}

const DashboardValue = (props: DashboardValueProps): React.ReactElement => {
  const {
    align = "left",
    aria = {},
    className,
    data = {},
    id,
    statChange = {},
    statLabel,
    statValue = {},
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss("pb_dashboard_value_kit", align),
    globalProps(props),
    className
  )

  return (
    <div {...ariaProps} {...dataProps} className={classes} id={id}>
      {statLabel && <Body color="light">{statLabel}</Body>}
      {statValue && <StatValue unit={statValue.unit} value={statValue.value} />}
      {statChange && (
        <StatChange change={statChange.change} value={statChange.value} />
      )}
    </div>
  )
}

export default DashboardValue
