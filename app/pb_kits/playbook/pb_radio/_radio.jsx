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
}

const Radio = (props: RadioProps) => {
  const {
    checked=false,
    children,
    className,
    dark=false,
    data,
    id,
    label,
    name,
    value,
  } = props

  return (
    <label
        className={`pb_radio_kit` + (dark === true ? '_dark' : '')}
        htmlFor={id}
    >
      <input
          defaultChecked={checked}
          name={name}
          type='radio'
          value={value}
      />
      <span class="pb_radio_button"/>
      <If condition={children}>
        {children}
      <Else/>
        <Body text={label} />
      </If>
    </label>
  );
};

export default Radio
