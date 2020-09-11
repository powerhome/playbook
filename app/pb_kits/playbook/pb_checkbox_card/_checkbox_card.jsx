
/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Body, Icon, SelectableCard } from '../'
import { noop } from '../utilities/props'

type CheckboxCardProps = {
  aria?: object,
  children?: array<React.ReactNode> | React.ReactNode,
  className?: string,
  disabled?: Boolean,
  data?: object,
  id?: string,
  text?: string,
  checked?: boolean,
  onChange: InputCallback<HTMLInputElement>,
  name?: string,
  inputId: string
}

const CheckboxCard = (props: CheckboxCardProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    checked = false,
    disabled = false,
    children = [],
    onChange = noop,
    text = '',
    name = '',
    inputId = null,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_checkbox_card_kit'), className, globalProps(props))

  const inputIdPresent = inputId !== null ? inputId : name

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <SelectableCard
          disabled={disabled}
          inputId={inputIdPresent}
          name={name}
          onChange={onChange}
          selected={checked}
      >
        <div>
          <span className="pb_checkbox_checkmark mr_xs">
            <Icon
                className="check_icon"
                fixedWith
                icon="check"
            />
          </span>
          <Body text={text} />

          <If condition={!text}>
            {children}
          </If>
        </div>
        <If condition={text}>
          <div>{children}</div>
        </If>
      </SelectableCard>
    </div>
  )
}

export default CheckboxCard
