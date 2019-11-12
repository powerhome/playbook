/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import { Icon } from '../'
import classnames from 'classnames'

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
  text?: String,
  value?: String,

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
  multi,
  id,
  value,
  checked,
  disabled,
}: SelectableCardProps) => {
  if( multi === false ) return <input type="radio" name={name} id={id} value={value} defaultChecked={checked} disabled={disabled}/>

  return <input type="checkbox" name={name} id={id} value={value} defaultChecked={checked} disabled={disabled}/> 
}

const SelectableCard = (props: SelectableCardProps) => { 
  const {
    checked,
    children,
    className,
    data,
    disabled,
    icon,
    id,
    multi=true,
    name,
    text,
    value
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