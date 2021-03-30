
/* @flow */

import React, { useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Body, Caption, Flex, Icon, PbReactPopover, ProgressSimple, TextInput } from '../'
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
  tips?: Array<string>,
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
    tips = [],
    value,
  } = props

  // maybe this can be memoized?
  const calculator = zxcvbnPasswordScore({ averageThreshold, strongThreshold })

  const [showPopover, setShowPopover] = useState(false)
  const toggleShowPopover = () => setShowPopover(!showPopover)
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => setShowPassword(!showPassword)

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_passphrase'), globalProps(props), className)

  const { percent: progressPercent, variant: progressVariant, text: strengthLabel, strength, suggestions, warning } = calculator.test(value)
  //This needs a debounce here.

  const popoverReference = (
    <a onClick={toggleShowPopover}>
      <Icon
          icon="info-circle"
          size="xs"
          variant="link"
      />
    </a>
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Flex align="baseline">
        <Caption text={label} />
        <If condition={tips.length > 0}>
          <PbReactPopover
              placement="right"
              reference={popoverReference}
              show={showPopover}
          >
            {
              tips.join(' ')
            }
          </PbReactPopover>
        </If>
      </Flex>
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
