/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

type RangeSliderProps = {
  className?: String,
  data?: String,
  id?: String,
  max?: String,
  min?: String,
  step?: String,
  value?: String,

}

const RangeSlider = ({
  className,
  data = {},
  id,
  max = 100,
  min = 0,
  onChange,
  step = 1,
  value,
}: RangeSliderProps) => {
  const dataProps = {}

  for (let key in data) {
    dataProps[`data-${key}`] = data[key]
  }

  return (
    <div {...dataProps} id={id} className={classnames("pb_range_slider", className)}>
      <input
          max={max}
          min={min}
          step={step}
          type="range"
          value={value}
          onChange={onChange}
      />
    </div>
  )
}

export default RangeSlider
