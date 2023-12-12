import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from '../utilities/props'

import Body from '../pb_body/_body'
import SelectableCard from '../pb_selectable_card/_selectable_card'
import SelectableIcon from '../pb_selectable_icon/_selectable_icon'

type SelectableCardIconProps = {
  aria?: { [key: string]: string },
  checked?: boolean,
  checkmark: boolean,
  className?: string,
  customIcon?: { [key: string]: SVGElement },
  dark?: boolean,
  data?: { [key: string]: string },
  disabled?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},,
  icon?: string,
  inputId?: string,
  multi?: boolean,
  name?: string,
  titleText?: string,
  bodyText?: string,
  value?: string,
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void,
}

const SelectableCardIcon = (props: SelectableCardIconProps) => {
  const {
    aria = {},
    checkmark = false,
    checked = false,
    className,
    customIcon,
    dark = false,
    data = {},
    disabled = false,
    htmlOptions = {},
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
  const htmlProps = buildHtmlProps(htmlOptions)

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
      {...htmlProps}
      className={classes}
    >
      <SelectableCard
        checked={checked}
        customIcon={customIcon}
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
              customIcon={customIcon}
              icon={icon}
              inputId={''}
              inputs="disabled"
              name={''}
              text={titleText} />
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
