/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import Body from '../pb_body/_body.jsx'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

type RadioProps = {
  className?: String,
  data?: String,
  error?: Boolean,
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

const Radio = ({
  checked = false,
  children,
  className = '',
  dark = false,
  data,
  error = false,
  id,
  label,
  name,
  value,
  text,
  onChange = () => {},
  ...props
}: RadioProps) => {
  const errorClass = error ? 'error' : ''

  return (
    <label
        className={classnames('pb_radio_kit' + (dark === true ? '_dark ' : ' ') + errorClass + ' ' + className, globalProps(props))}
        htmlFor={id}
    >
      <If condition={children}>
        {children}
        <Else />
        <input
            {...props}
            checked={checked}
            data={data}
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
          status={error ? 'negative' : null}
          text={label}
      />
    </label>
  )
}

export default Radio
