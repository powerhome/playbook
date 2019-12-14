/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

import classnames from 'classnames'
import Title from '../pb_title/_title.jsx'

type PillProps = {
  className?: String,
  id?: String,
  text: String,
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral',
}

const Pill = ({
  className,
  text,
  variant = 'neutral',
}: PillProps) => {
  const css = classnames([
    `pb_pill_kit_${variant}`,
    className,
  ])

  return (
    <div className={css}>
      <Title
          className="pb_pill_text"
          size={4}
          text={text}
      />
    </div>
  )
}

export default Pill
