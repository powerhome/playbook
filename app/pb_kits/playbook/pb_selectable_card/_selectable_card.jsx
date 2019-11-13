/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import { Icon } from '../'
import classnames from 'classnames'

type EventHandler = (SyntheticInputEvent<HTMLInputElement>) => void

type SelectableCardProps = {
  checked?: Boolean,
  children?: Array<React.ReactChild>,
  className?: String,
  dark?: Boolean,
  data?: String,
  disabled?: Boolean,
  icon?: Boolean,
  id?: String,
  multi?: Boolean,
  name?: String,
  onSelect?: () => void,
  text?: String,
  value?: String
}

const selectablecardCSS = ({
  checked=false,
  dark=false,
  disabled=false,

}: SelectableCardProps) => {

  const checkedStyle = checked === true ? '_checked' : ''

  const themeStyle = dark === true ? '_dark' : ''

  const disabledStyle = disabled == true ? '_disabled' : '_enabled'


  return 'pb_selectable_card_kit' + checkedStyle + themeStyle + disabledStyle
}

const CheckboxRadio = ({
  name,
  multi=true,
  id,
  onSelect,
  value,
  checked,
  disabled
}: SelectableCardProps) => {
  const inputType = multi === false ? "radio" : "checkbox"
  return (
    <input
        type="checkbox"
        name={name}
        id={id}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onSelect}
    />
  )
}

const SelectableCard = (props: SelectableCardProps) => {
  const {
    children,
    className,
    name,
    text
  } = props
  return (
    <span className={classnames(selectablecardCSS(props), className)} >
      <CheckboxRadio {...props} />
        <label htmlFor={name} dark>
        { text || children }
        <div className={"pb_selectable_card_circle"}>
          <Icon icon="check" fixedWidth/>
        </div>
      </label>
    </span>
  )
}
export default SelectableCard
