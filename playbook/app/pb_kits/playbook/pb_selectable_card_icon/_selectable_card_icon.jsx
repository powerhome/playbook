/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, SelectableCard, SelectableIcon } from '../'
import { globalProps } from '../utilities/globalProps.js'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

type SelectableCardIconProps = {
  aria?: Object,
  checked?: boolean,
  checkmark: boolean,
  className?: string,
  dark?: boolean,
  data?: Object,
  disabled?: boolean,
  icon?: string,
  inputId?: string,
  multi?: boolean,
  name?: string,
  titleText?: string,
  bodyText?: string,
  value?: string,
  onChange?: (e) => void,
}

const SelectableCardIcon = (props: SelectableCardIconProps) => {
  const {
    aria = {},
    checkmark = false,
    checked = false,
    className,
    dark = false,
    data = {},
    disabled = false,
    icon,
    inputId,
    multi = true,
    name,
    titleText,
    bodyText,
    value,
    onChange,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const classes = classnames(
    buildCss('pb_selectable_card_icon_kit', {
      checked: checked,
      disabled: disabled,
      enabled: !disabled,
    }),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
    >
      <SelectableCard
          checked={checked}
          dark={dark}
          disabled={disabled}
          icon={checkmark}
          inputId={inputId}
          multi={multi}
          name={name}
          onChange={onChange}
          value={value}
      >
        {
          <>
            <SelectableIcon
                icon={icon}
                inputs="disabled"
                size="2x"
                text={titleText}
            />
            <Body
                color="light"
                dark={dark}
                text={bodyText}
            />
          </>
        }
      </SelectableCard>
    </div>
  )
}

export default SelectableCardIcon
