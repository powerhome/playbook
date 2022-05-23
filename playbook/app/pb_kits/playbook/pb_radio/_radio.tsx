/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React, { forwardRef } from 'react'
import Body from '../pb_body/_body'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

type RadioProps = {
  aria?: {[key: string]: string},
  alignment?: String,
  checked?: Boolean,
  children?: Node,
  className?: String,
  dark?: boolean,
  data?: {[key: string]: string},
  error?: Boolean,
  id?: String,
  label: String,
  name: String,
  value: String,
  text: String,
  onChange: (event: React.FormEvent<HTMLInputElement>)=>void,
} & GlobalProps

const Radio = ({
  aria = {},
  alignment = '',
  children,
  className,
  dark = false,
  data = {},
  error = false,
  id,
  label,
  name = 'radio_name',
  text = 'Radio Text',
  value = 'radio_text',
  onChange = () => {},
  ...props
}: RadioProps, ref): React.ReactElement => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_radio_kit'), { error }, { dark }, globalProps(props), alignment, className)

  const displayRadio = () => {
    if (children)
      return (children)
    else 
    return (
    <input
        {...props}
        id={id}
        name={name}
        onChange={onChange}
        ref={ref}
        text={text}
        type="radio"
        value={value}
    />
  )}

  return (
    <label
        {...ariaProps}
        {...dataProps}
        className={classes}
        htmlFor={id}
    >
    <>{displayRadio()}</>
      <span className="pb_radio_button" />
      <Body
          dark={dark}
          status={error ? 'negative' : null}
          text={label}
      />
    </label>
  )
}

export default forwardRef(Radio)
