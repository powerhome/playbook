/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import Body from '../pb_body/_body.jsx'

type PillProps = {
  className?: String,
  id?: String,
  text: String,
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral',
}

const Pill = ({ className, id, text, variant }: PillProps) => (
  <div className={`pb_pill_kit_${variant} ${className}`}>
    <Body tag="span">
      {text}
    </Body>
  </div>
)

Pill.defaultProps = {
  className: "",
  variant: "neutral"
};

export default Pill
