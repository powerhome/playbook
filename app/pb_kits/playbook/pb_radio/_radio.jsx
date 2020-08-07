/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import Body from '../pb_body/_body.jsx'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type RadioProps = {
  aria?: object,
  checked?: Boolean,
  children?: Node,
  className?: String,
  data?: object,
  error?: Boolean,
  id?: String,
  label: String,
  name: String,
  value: String,
  text: String,
  onChange: (Boolean)=>void,
}

const Radio = ({
  aria = {},
  checked = false,
  children,
  className,
  data = {},
  error = false,
  id,
  label,
  name = 'radio_name',
  text = 'Radio Text',
  value = 'radio_text',
  onChange = () => {},
  ...props
}: RadioProps) => {

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_radio_kit'), { error }, className, globalProps(props))
  const buttonClass = classnames(buildCss('pb_radio_button'), { checked }, className, globalProps(props))

  return (
    <label
        {...ariaProps}
        {...dataProps}
        className={classes}
        htmlFor={id}
    >
      <If condition={children}>
        {children}
        <Else />
        <input
            {...props}
            defaultChecked={checked}
            name={name}
            onChange={onChange}
            text={text}
            type="radio"
            value={value}
        />
      </If>
      <span className={buttonClass} />
      <Body
          status={error ? 'negative' : null}
          text={label}
      />
    </label>
  )
}

export default Radio
