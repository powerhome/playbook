/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Caption } from '../'
import type { InputCallback } from '../types.js'
import { globalProps } from '../utilities/globalProps.js'

type TextareaProps = {
  className?: string,
  children?: array<React.ReactChild>,
  data?: string,
  error?: string,
  id?: string,
  object?: string,
  method?: string,
  label?: string,
  placeholder?: string,
  value?: string,
  name?: string,
  rows?: number,
  resize: 'none' | 'both' | 'horizontal' | 'vertical',
  onChange?: InputCallback<HTMLTextAreaElement>,
}

const Textarea = ({
  className,
  children,
  resize = 'none',
  error,
  label,
  name,
  onChange = () => {},
  placeholder,
  rows = 4,
  value,
  ...props
}: TextareaProps) => {
  const errorClass = error ? 'error' : null
  const resizeClass = `resize_${resize}`
  const classes = classnames('pb_textarea_kit', className, errorClass, resizeClass, globalProps(props))

  return (
    <div className={classes}>
      <Caption
          text={label}
      />
      <If condition={children}>
        {children}
        <Else />
        <textarea
            {...props}
            className="pb_textarea_kit"
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            value={value}
        />
        <If condition={error}>
          <Body
              status="negative"
              text={error}
          />
        </If>
      </If>
    </div>
  )
}

export default Textarea
