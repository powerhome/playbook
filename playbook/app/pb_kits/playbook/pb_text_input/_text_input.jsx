/* @flow */
import React, { forwardRef, useRef } from 'react'
import classnames from 'classnames'
import { Body, Caption, Flex, Icon, PbReactPopover, ProgressSimple } from '../'
import { globalProps } from '../utilities/globalProps.js'
import passwordStrengthCalculation from '../utilities/passwordStrength.js'

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
    placeholder,
    required,
    type = 'text',
    value = '',
    variant = null,
    children = null,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames([
    'pb_text_input_kit',
    error ? 'error' : null,
    globalProps(props),
    className,
  ])

  // Ref getting set to {} somehow from popper, not sure
  if (ref && !(Object.prototype.hasOwnProperty.call(ref, 'current'))) ref = null

  const { colorVariant: passwordColorVariant, text: passwordText, strength: passwordStrength, suggestions: passwordSuggestions = [] } = (variant && value.length > 0 ? passwordStrengthCalculation(value) : {})
  const passwordDisplayStrength = passwordStrength + 1
  const inputID = id || `password-input-${Math.floor(Math.random() * 1000)}`
  ref = ref || useRef(false)

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
              {...props}
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
                  value={passwordDisplayStrength}
              />
            </When>
            <When condition={variant === 'passwordStrength2'}>
              <>
                <ProgressSimple
                    max={5}
                    value={passwordDisplayStrength}
                    variant={passwordColorVariant}
                />
                <Caption>{passwordText}</Caption>
              </>
            </When>
            <When condition={variant === 'passwordStrength3'}>
              <>
                <ProgressSimple
                    max={5}
                    value={passwordDisplayStrength}
                    variant={passwordColorVariant}
                />
                <Flex>
                  <Caption>{passwordText}</Caption>
                  <PbReactPopover
                      offset
                      placement="bottom"
                      reference={infoIcon}
                      show={passwordDisplayStrength && inputID === document.activeElement.id}
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
                  show={passwordDisplayStrength && inputID === document.activeElement.id}
              >
                <Caption>{'Strength: ' + passwordText}</Caption>
                <ProgressSimple
                    max={5}
                    value={passwordDisplayStrength}
                    variant={passwordColorVariant}
                />
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
