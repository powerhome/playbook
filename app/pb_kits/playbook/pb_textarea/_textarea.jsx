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
  disabled?: boolean,
  error?: boolean,
  errorMessage?: string,
  id?: string,
  object?: string,
  method?: string,
  label?: string,
  placeholder?: string,
  value?: string,
  name?: string,
  required?: boolean,
  rows?: number,
  resize: 'none' | 'both' | 'horizontal' | 'vertical',
  onChange?: InputCallback<HTMLTextAreaElement>,
}

const Textarea = ({
  className,
  children,
  disabled,
  resize = 'none',
  error = false,
  errorMessage,
  label,
  name,
  onChange = () => {},
  placeholder,
  required,
  rows = 4,
  value,
  ...props
}: TextareaProps) => {
  const errorClass = error ? 'error' : null
  const resizeClass = `resize_${resize}`
  const classes = classnames('pb_textarea_kit', errorClass, resizeClass, globalProps(props), className)

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
            disabled={disabled}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
            value={value}
        />
        <If condition={error}>
          <Body
              status="negative"
              text={errorMessage}
          />
        </If>
      </If>
    </div>
  )
}

export default Textarea
