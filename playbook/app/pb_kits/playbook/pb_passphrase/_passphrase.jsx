
/* @flow */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import useZxcvbn from './useZxcvbn'
import useHaveIBeenPwned from './useHaveIBeenPwned'
import { Body, Caption, Flex, Icon, PbReactPopover, ProgressSimple, TextInput } from '../'

type PassphraseProps = {
  aria?: object,
  averageThreshold?: number,
  checkPwned?: boolean,
  common?: boolean,
  confirmation?: boolean,
  className?: string,
  data?: object,
  dark?: boolean,
  id?: string,
  inputProps?: {},
  label?: string,
  minLength?: number,
  onChange: (String) => void,
  showTipsBelow?: 'always' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  onStrengthChange?: (number) => void,
  strongThreshold?: number,
  tips?: Array<string>,
  uncontrolled?: boolean,
  value: string,
}

const Passphrase = (props: PassphraseProps) => {
  const {
    aria = {},
    averageThreshold = 2,
    checkPwned = false,
    className,
    common = false,
    confirmation = false,
    dark = false,
    data = {},
    id,
    inputProps = {},
    label = confirmation ? 'Confirm Passphrase' : 'Passphrase',
    minLength = 12,
    onChange = () => {},
    showTipsBelow = 'always',
    onStrengthChange,
    strongThreshold = 3,
    tips = [],
    uncontrolled = false,
    value = '',
  } = props
  const ariaProps = buildAriaProps(aria)

  const [uncontrolledValue, setUncontrolledValue] = useState('')

  const handleChange = useCallback(
    (e) => uncontrolled ? setUncontrolledValue(e.target.value) :  onChange(e),
    [uncontrolled, onChange]
  )

  const displayValue = useMemo(
    () => (uncontrolled ? uncontrolledValue : value),
    [value, uncontrolledValue, uncontrolled],
  )

  const [showPopover, setShowPopover] = useState(false)
  const toggleShowPopover = () => setShowPopover(!showPopover)
  const [showPassphrase, setShowPassphrase] = useState(false)
  const toggleShowPassphrase = () => setShowPassphrase(!showPassphrase)

  const classes = classnames(buildCss('pb_passphrase'), globalProps(props), className)

  const isPwned = checkPwned ? useHaveIBeenPwned(displayValue, minLength) : false

  const { percent: progressPercent, variant: progressVariant, text: strengthLabel, strength } = useZxcvbn({ passphrase: value, common, isPwned, confirmation, averageThreshold, minLength, strongThreshold })

  useEffect(() => {
    if (typeof onStrengthChange === 'function') {
      onStrengthChange(strength)
    }
  }, [strength, common, isPwned])

  const tipClass = classnames(
    (dark ? 'dark' : null),
    (showTipsBelow === 'always' ? null : `show-below-${showTipsBelow}`),
  )
  const dataProps = useMemo(
    () => (buildDataProps(Object.assign({}, data, { strength }))),
    [data, strength]
  )

  const popoverReference = (
    <a
        className={tipClass}
        onClick={toggleShowPopover}
    >
      <Icon
          dark={dark}
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
      <label>
        <Flex align="baseline">
          <Caption
              className="passphrase-label"
              text={label}
          />
          <If condition={tips.length > 0 && !confirmation}>
            <PbReactPopover
                placement="right"
                reference={popoverReference}
                show={showPopover}
            >
              <Flex
                  align="center"
                  orientation="column"
              >
                <Caption
                    marginBottom="xs"
                    text="Tips for a good passphrase"
                />
                <div>
                  {
                    tips.map((tip, i) => (
                      <Caption
                          key={i}
                          marginBottom="xs"
                          size="xs"
                      >
                        <Icon
                            icon="shield-check"
                            marginRight="xs"
                        />
                        {tip}
                      </Caption>
                    ))
                  }
                </div>
              </Flex>
            </PbReactPopover>
          </If>
        </Flex>
        <div className="passphrase-text-input-wrapper">
          <TextInput
              className="passphrase-text-input"
              dark={dark}
              marginBottom="xs"
              onChange={handleChange}
              placeholder="Enter a passphrase..."
              type={showPassphrase ? 'text' : 'password'}
              value={displayValue}
              {...inputProps}
          />
          <span
              className="show-passphrase-icon"
              dark={dark}
              onClick={toggleShowPassphrase}
          >
            <Body
                className={showPassphrase ? 'hide-icon' : ''}
                color="light"
                dark={dark}
            >
              <Icon icon="eye-slash" />
            </Body>
            <Body
                className={showPassphrase ? '' : 'hide-icon'}
                color="light"
                dark={dark}
            >
              <Icon icon="eye" />
            </Body>
          </span>
        </div>
      </label>
      <If condition={!confirmation}>
        <ProgressSimple
            className={displayValue.length === 0 ? 'progress-empty-input' : null}
            dark={dark}
            percent={progressPercent}
            variant={progressVariant}
        />
        <Caption
            dark={dark}
            size="xs"
            text={strengthLabel}
        />
      </If>
    </div>
  )
}

export default Passphrase
