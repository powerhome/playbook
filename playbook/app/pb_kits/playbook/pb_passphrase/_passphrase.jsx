
/* @flow */

import React, { useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Body, Caption, Icon, ProgressSimple, TextInput } from '../'

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
    strengthFunction,
    strongThreshold = 3,
    value,
  } = props

  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => setShowPassword(!showPassword)

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_passphrase'), globalProps(props), className)

  const feedbackValues = (str) => {
    let percent = 0
    let variant = 'default'
    let text = ''

    if (str > 0 && str < averageThreshold) {
      percent = 25
      variant = 'negative'
      text = 'Weak Passphrase'
    } else if (str >= averageThreshold && str < strongThreshold){
      percent = 50
      variant = 'warning'
      text = 'Average Passphrase'
    } else if (str >= strongThreshold) {
      percent = 100
      variant = 'positive'
      text = 'Strong Passphrase'
    }
    return [percent.toString(), variant, text]
  }

  const strength = strengthFunction ? strengthFunction(value) : Math.floor(value.length / 3)

  const [progressPercent, progressVariant, strengthLabel] = feedbackValues(strength)

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
    </div>
  )
}

export default Passphrase
