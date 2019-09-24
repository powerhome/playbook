/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

import Body from '../pb_body/_body.jsx'

type LegendIndicatorProps = {
  className?: String,
  color?: 'blue' | 'green',
  data?: String,
  id?: String,
  text?: String,
}

const LegendIndicator = ({ className, color='blue', data, id, text }: LegendIndicatorProps) => (
  <div className={`pb_legend_indicator_kit_${color}`}>
    <span class="pb_legend_indicator_circle"></span> &nbsp;
    <Body color="light" tag="span">
      {text}
    </Body>
  </div>
)

export default LegendIndicator
