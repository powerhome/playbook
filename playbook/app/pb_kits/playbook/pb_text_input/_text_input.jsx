/* @flow */
import React, { forwardRef } from 'react'
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

  const { colorVariant: passwordColorVariant, text: passwordText, strength: passwordStrength, suggestions: passwordSuggestions = [] } = (variant && value.length > 0 ? passwordStrengthCalculation(value) : {})
  const passwordDisplayStrength = passwordStrength + 1

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
              id={id}
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
                      show={passwordDisplayStrength}
                      {...props}
                  >
                    <Caption>
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
