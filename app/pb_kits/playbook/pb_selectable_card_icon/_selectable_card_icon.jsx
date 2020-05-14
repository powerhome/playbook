/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, SelectableCard, SelectableIcon } from '../'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

type SelectableCardIconProps = {
  aria?: Object,
  cardIcon: Boolean,
  checked?: Boolean,
  className?: String,
  dark?: Boolean,
  data?: Object,
  disabled?: Boolean,
  icon?: String,
  inputId?: String,
  multi?: Boolean,
  name?: String,
  titleText?: String,
  bodyText?: String,
  value?: String,
  onChange?: (e) => void,
}

const SelectableCardIcon = ({
  aria = {},
  cardIcon = false,
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
}: SelectableCardIconProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const css = buildCss({
    'pb_selectable_card_icon_kit': true,
    'checked': checked,
    'dark': dark,
    'disabled': disabled,
    'enabled': !disabled,
  })

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(css, className)}
    >
      <SelectableCard
          checked={checked}
          dark={dark}
          disabled={disabled}
          icon={cardIcon}
          inputId={inputId}
          multi={multi}
          name={name}
          onChange={onChange}
          value={value}
      >
        {
          <>
            <SelectableIcon
                dark={dark}
                icon={icon}
                inputless
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
