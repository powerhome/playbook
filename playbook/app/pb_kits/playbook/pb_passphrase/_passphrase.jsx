/* @flow */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useCallback, useMemo, useState } from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import CircleIconButton from '../pb_circle_icon_button/_circle_icon_button'
import Flex from '../pb_flex/_flex'
import Icon from '../pb_icon/_icon'
import PbReactPopover from '../pb_popover/_popover'
import TextInput from '../pb_text_input/_text_input'

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
    className,
    confirmation = false,
    dark = false,
    data = {},
    id,
    inputProps = {},
    label = confirmation ? 'Confirm Passphrase' : 'Passphrase',
    onChange = () => {},
    showTipsBelow = 'always',
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
  const handleShouldClosePopover = (shouldClosePopover) => {
    setShowPopover(!shouldClosePopover)
  }

  const [showPassphrase, setShowPassphrase] = useState(false)
  const toggleShowPassphrase = (e) => {
    e.preventDefault()
    setShowPassphrase(!showPassphrase)
  }

  const classes = classnames(buildCss('pb_passphrase'), globalProps(props), className)

  const tipClass = classnames(
    'passphrase-popover',
    (showTipsBelow === 'always' ? null : `show-below-${showTipsBelow}`),
  )
  const dataProps = useMemo(
    () => (buildDataProps(Object.assign({}, data))),
    [data]
  )

  const popoverReference = (
    <CircleIconButton
        className={tipClass}
        dark={dark}
        icon="info-circle"
        onClick={toggleShowPopover}
        variant="link"
    />
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
                className="passphrase-tips"
                closeOnClick="outside"
                placement="right"
                reference={popoverReference}
                shouldClosePopover={handleShouldClosePopover}
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
    </div>
  )
}

export default Passphrase
