
/* @flow */

import React, { useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Body, Caption, Icon, ProgressSimple, TextInput } from '../'
import { zxcvbnPasswordScore }  from './passwordStrength.js'

type PassphraseProps = {
  aria?: object,
  averageThreshold?: number,
  className?: string,
  data?: object,
  id?: string,
  label?: string,
  minLength?: number,
  onChange: (String) => void,
  strengthFunction?: (string) => any,
  strongThreshold?: number,
  value: string,
}

const Passphrase = (props: PassphraseProps) => {
  const {
    aria = {},
    averageThreshold = 2,
    className,
    data = {},
    id,
    label = 'Passphrase',
    // minLength, this will be needed
    onChange = () => {},
    strongThreshold = 3,
    value,
  } = props

  // maybe this can be memoized?
  const calculator = zxcvbnPasswordScore({ averageThreshold, strongThreshold })

  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => setShowPassword(!showPassword)

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_passphrase'), globalProps(props), className)

  const { percent: progressPercent, variant: progressVariant, text: strengthLabel, strength, suggestions, warning } = calculator.test(value)
  //This needs a debounce here.

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Caption text={label} />
      <div className="text-input-wrapper">
        <TextInput
            className="password-text-input"
            onChange={onChange}
            placeholder="Enter a passphrase..."
            type={showPassword ? 'text' : 'password'}
            value={value}
        />
        <span
            className="show-password-icon"
            onClick={toggleShowPassword}
        >
          <Body
              className={showPassword ? 'hide-icon' : ''}
              color="light"
          >
            <Icon icon="eye-slash" />
          </Body>
          <Body
              className={showPassword ? '' : 'hide-icon'}
              color="light"
          >
            <Icon icon="eye" />
          </Body>

        </span>
      </div>
      <ProgressSimple
          percent={progressPercent}
          variant={progressVariant}
      />
      <Caption
          size="xs"
          text={strengthLabel}
      />
      {strength}
      {suggestions}
      {warning}
    </div>
  )
}

export default Passphrase
