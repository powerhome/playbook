/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type RangeSliderProps = {
  className?: String,
  data?: String,
  id?: String,
  max?: String,
  min?: String,
  step?: String,
  value?: String,
  
}

const RangeSlider = ({ className, data, id, max, min, step, value }: RangeSliderProps) => (
  <div>
    {`kit content`}
  </div>
)

export default RangeSlider
