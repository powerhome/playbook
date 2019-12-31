/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import Body from '../pb_body/_body.jsx'

type RadioProps = {
  className?: String,
  data?: String,
  id?: String,
  label: String,
  name: String,
  value: String,
  checked?: Boolean,
  dark?: Boolean,
  text: String,
  children?: Node,
  onChange: (Boolean)=>void,
}

const Radio = (props: RadioProps) => {
  const {
    checked = false,
    children,
    className,
    dark = false,
    data,
    id,
    label,
    name,
    value,
    text,
    onChange = () => {},
  } = props

  return (
    <label
        className={'pb_radio_kit' + (dark === true ? '_dark ' : ' ') + className}
        htmlFor={id}
    >
      <If condition={children}>
        {children}
        <Else />
        <input
            data={data}
            defaultChecked={checked}
            name={name}
            onChange={onChange}
            text={text}
            type="radio"
            value={value}
        />
      </If>
      <span className="pb_radio_button" />
      <Body
          dark={dark}
          text={label}
      />
    </label>
  )
}

export default Radio
