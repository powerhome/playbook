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
  dark?: Boolean

}

export const Radio = ({
  checked,
  className,
  dark,
  data,
  id,
  label,
  name,
  value,
}: RadioProps) => (

    <label className={`pb_radio_kit` + (dark === true ? '_dark' : '')}>
      <input type="radio" name={name} value={value} defaultChecked={checked}/>
      <span className="pb_radio_button">
        <div className="radio"></div>
      </span>
      <span className="body">{label}</span>
    </label>

)

export default Radio
