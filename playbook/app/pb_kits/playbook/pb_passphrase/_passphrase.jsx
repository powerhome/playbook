
/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type PassphraseProps = {
  aria?: object,
  averageThreshold?: string,
  className?: string,
  data?: object,
  id?: string,
  minLength?: string,
  strengthFunction?: string,
  strongThreshold?: string,
}

const Passphrase = (props: PassphraseProps) => {
  const {
    aria = {},
    averageThreshold,
    className,
    data = {},
    id,
    minLength,
    strengthFunction,
    strongThreshold,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_passphrase'), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {className}
    </div>
  )
}

export default Passphrase
