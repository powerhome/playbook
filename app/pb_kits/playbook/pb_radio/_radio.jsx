/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

/*
// Un-comment to import kits here
import { Body } from '../'
*/

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

export const Radio = ({ className, data, id, label, name, value, checked, dark}: RadioProps) => (

    <label className={`pb_radio_kit` + (dark === true ? '_dark' : '')}>
      <input type="radio" name={name} value={value} defaultChecked={checked}/>
      <span className="pb_radio_button">
        <div className="radio"></div>
      </span>
      <span className="pb_radio_label">{label}</span>
    </label>

)

export default Radio
