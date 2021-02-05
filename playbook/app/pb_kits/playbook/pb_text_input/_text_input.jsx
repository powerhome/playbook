/* @flow */
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { Body, Caption, Flex, Icon, PbReactPopover, ProgressSimple } from '../'
import { globalProps } from '../utilities/globalProps.js'
import { owaspPasswordScore, zxcvbnPasswordScore }  from '../utilities/passwordStrength.js'

import {
  buildAriaProps,
  buildDataProps,
} from '../utilities/props'

type TextInputProps = {
  aria?: object,
  className: string,
  data?: object,
  dark?: boolean,
  disabled?: boolean,
  error?: string,
  id?: string,
  name: string,
  label: string,
  onChange: (String) => void,
  passwordOptions: {
    calculate?: (String) => { score: integer, feedback?: { suggestions?: array<string>, warning?: string} },
    config?: {}
  },
  placeholder: string,
  required?: boolean,
  type: string,
  value: string | number,
  variant?: string,
  children: Node,
}

const TextInput = (
  props: TextInputProps,
  ref: React.ElementRef<"input">
) => {
  const {
    aria = {},
    className,
    data = {},
    dark = false,
    disabled,
    error,
    id,
    name,
    label,
    onChange = () => {},
    passwordOptions = {},
    placeholder,
    required,
    type = 'text',
    value = '',
    variant = null,
    children = null,
    ...rest
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames([
    'pb_text_input_kit',
    error ? 'error' : null,
    globalProps(props),
    className,
  ])

  const [passwordScorer, setPasswordScorer] = useState({ test: () => ({}) })
  useEffect(() => {
    if (variant === 'passwordStrengthOwasp') {
      setPasswordScorer(owaspPasswordScore(passwordOptions))
    } else if (variant && variant?.includes('password')) {
      setPasswordScorer(zxcvbnPasswordScore(passwordOptions))
    }
  }, [])

  // Im sure this can be optimized... useMemo?
  const passwordCalculationResult = passwordScorer.test(value)

  // Results from zxcvbn
  const {
    colorVariant: passwordColorVariant,
    strength: passwordStrength,
    text: passwordText,
    suggestions: passwordSuggestions = [],
    warning: passwordWarning,
  } = passwordCalculationResult

  // results from Owasp
  // these are separate just for easy of seeing which is which
  const {
    strong: passwordStrong,
    optionalTestErrors: optionalPasswordErrors,
    requiredTestErrors: requiredPasswordErrors,
    isPassphrase,
  } = passwordCalculationResult

  // ID used to determine which is focused to show popover,
  // probably a better way to show, plus it doesnt unfocus
  const inputID = id || `password-input-${Math.floor(Math.random() * 1000)}`
  ref = ref || useRef(false)

  const strongPasswordOrPhrase = () => {
    if (passwordStrong && isPassphrase) {
      return 'This is a strong passphrase.'
    } else if (passwordStrong) {
      return 'This is a strong password.'
    } else {
      return 'This is not a strong password'
    }
  }

  const infoIcon = (
    <Icon
        icon="info"
        size="sm"
    />
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
    >
      <Caption
          className="pb_text_input_kit_label"
          dark={dark}
          text={label}
      />
      <div className="text_input_wrapper">
        <If condition={children}>
          {children}
          <Else />
          <input
              {...rest}
              className="text_input"
              disabled={disabled}
              id={inputID}
              name={name}
              onChange={onChange}
              placeholder={placeholder}
              ref={ref}
              required={required}
              type={type}
              value={value}
          />
          <Choose>
            <When condition={variant === 'passwordStrength'}>
              <Caption>{passwordText}</Caption>
            </When>
            <When condition={variant === 'passwordStrength1'}>
              <meter
                  max="5"
                  min="0"
                  optimum="3"
                  value={passwordStrength}
              />
            </When>
            <When condition={variant === 'passwordStrength2'}>
              <>
                <ProgressSimple
                    max={5}
                    value={passwordStrength}
                    variant={passwordColorVariant}
                />
                <Caption>{passwordText}</Caption>
              </>
            </When>
            <When condition={variant === 'passwordStrength3'}>
              <>
                <ProgressSimple
                    max={5}
                    value={passwordStrength}
                    variant={passwordColorVariant}
                />
                <Flex>
                  <Caption>{passwordText}</Caption>
                  <PbReactPopover
                      offset
                      placement="bottom"
                      reference={infoIcon}
                      show={passwordStrength && inputID === document.activeElement.id}
                  >
                    <Caption maxWidth="sm">
                      {
                        passwordSuggestions.map((suggestion, i) => (
                          <p key={i}>{suggestion}</p>
                        )
                      )}
                    </Caption>
                  </PbReactPopover>
                </Flex>
              </>
            </When>
            <When condition={variant === 'passwordStrength4'}>
              <PbReactPopover
                  padding="xs"
                  placement="bottom"
                  referenceElement={ref.current}
                  show={passwordStrength && inputID === document.activeElement.id}
              >
                <Caption>{'Strength: ' + passwordText}</Caption>
                <ProgressSimple
                    max={5}
                    value={passwordStrength}
                    variant={passwordColorVariant}
                />
                <If condition={passwordWarning}>
                  <Body
                      maxWidth="xs"
                      status="negative"
                      text={passwordWarning}
                  />
                </If>
                <Body
                    color="light"
                    maxWidth="xs"
                >
                  {
                    passwordSuggestions.map((suggestion, i) => (
                      <p key={i}>{suggestion}</p>
                    )
                  )}
                </Body>
              </PbReactPopover>
            </When>
            <When condition={variant === 'passwordStrengthOwasp'}>
              <PbReactPopover
                  padding="xs"
                  placement="bottom"
                  referenceElement={ref.current}
                  show={value.length > 0 && inputID === document.activeElement.id}
              >
                <Caption>
                  {strongPasswordOrPhrase()}
                </Caption>
                <Body
                    maxWidth="xs"
                    status="negative"
                >
                  {
                    requiredPasswordErrors?.map((error, i) => (
                      <p key={i}>{error}</p>
                    )
                    )}

                </Body>
                <Body
                    color="light"
                    maxWidth="xs"
                >
                  {
                    optionalPasswordErrors?.map((error, i) => (
                      <p key={i}>{error}</p>
                    )
                  )}
                </Body>
              </PbReactPopover>
            </When>
          </Choose>
          <If condition={error}>
            <Body
                status="negative"
                text={error}
            />
          </If>
        </If>
      </div>
    </div>
  )
}

export default forwardRef(TextInput)
