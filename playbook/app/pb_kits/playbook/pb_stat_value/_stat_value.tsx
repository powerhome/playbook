import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import { buildHtmlProps } from '../utilities/props'
import Title from '../pb_title/_title'

type StatValueProps = {
  className?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  unit?: string,
  value: string | number,
}

const StatValue = (props: StatValueProps): React.ReactElement => {
  const {
    className,
    htmlOptions = {},
    id,
    unit,
    value = 0,
  } = props

  const htmlProps = buildHtmlProps(htmlOptions)

  const displayValue = function(value: string | number) {
    if (value || value === 0) {
      return (
        <Title
            size={1}
            tag="span"
            text={`${value}`}
        />
      )
    }
  }

  const displayUnit = function(unit: string) {
    if (unit) {
      return (
        <Title
            size={3}
            tag="span"
            text={unit}
        />
      )
    }
  }

  return (
    <div
        className={classnames('pb_stat_value_kit', globalProps(props), className)}
        id={id}
        {...htmlProps}
    >
      <div className="pb_stat_value_wrapper">
        {displayValue(value)}
        &nbsp;
        {displayUnit(unit)}
      </div>
    </div>
  )
}

export default StatValue
