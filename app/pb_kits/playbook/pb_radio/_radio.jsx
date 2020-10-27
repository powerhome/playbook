/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import Body from '../pb_body/_body.jsx'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type RadioProps = {
  aria?: object,
  checked?: boolean,
  children?: Node,
  className?: string,
  dark?: boolean,
  data?: object,
  error?: boolean,
  errorMessage?: string,
  id?: string,
  label: string,
  name: string,
  value: string,
  text: string,
  onChange: (Boolean)=>void,
}

const Radio = ({
  aria = {},
  children,
  className,
  dark = false,
  data = {},
  error = false,
  errorMessage,
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
  const classes = classnames(buildCss('pb_radio_kit'), error ? 'error' : null, { dark }, globalProps(props), className)

  return (
    <>
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
              id={id}
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
      <If condition={error}>
        <Body
            status="negative"
        >
          {errorMessage}
        </Body>
      </If>
    </>
  )
}

export default Radio
