import React from 'react'
import classnames from 'classnames'
import { Icon } from '../'

import type {
  InputCallback
} from "../types"

import {
  buildAriaProps,
  buildDataProps,
  buildCss,
  noop,
} from '../utilities/props'

type Props = {
  aria: Object,
  checked: Boolean,
  children?: Array<React.ReactChild>,
  className?: String,
  dark?: Boolean,
  data: Object,
  disabled?: Boolean,
  icon?: Boolean,
  id?: String,
  inputId?: String,
  multi?: Boolean,
  name?: String,
  onChange: InputCallback,
  text?: String,
  value?: String
};

const SelectableCard = ({
  aria = {},
  checked = false,
  children,
  className,
  dark = false,
  data = {},
  disabled = false,
  icon = false,
  id = null,
  inputId = null,
  multi = true,
  name,
  onChange = noop,
  text,
  value,
  ...props
}: Props) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  
  const css = buildCss({
    'pb_selectable_card_kit': true,
    'checked': checked,
    'dark': dark,
    'disabled': disabled,
    'enabled': !disabled,
  })

  const displayIcon = () => {
    if(icon === true) {
      return (
        <div className="pb_selectable_card_circle">
          <Icon icon="check" fixedWidth/>
        </div>
      )
    }
  }

  const inputType = multi === false ? "radio" : "checkbox"

  const inputIdPresent = inputId !== null ? inputId : name


  return (
    <div {...ariaProps} {...dataProps} className={classnames(css, className)}>
      <input
          {...props}
          name={name}
          value={value}
          id={inputIdPresent}
          type={inputType}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
      />
      <label htmlFor={inputIdPresent}>
        { text || children }
        {displayIcon()}
      </label>
    </div>
  );
};
export default SelectableCard;