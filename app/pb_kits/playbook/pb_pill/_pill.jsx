/* @flow */

import React from 'react'

import classnames from 'classnames'
import Title from '../pb_title/_title.jsx'
import { systemProps } from '../utilities/systemProps.js'

type PillProps = {
  className?: String,
  id?: String,
  text: String,
  variant?: "success" | "warning" | "error" | "info" | "neutral",
}

const Pill = (props: PillProps) => {
  const { className, text, variant = 'neutral' } = props
  const css = classnames([`pb_pill_kit_${variant}`, className], systemProps(props))

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
