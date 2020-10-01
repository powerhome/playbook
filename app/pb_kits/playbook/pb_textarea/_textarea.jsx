/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Caption } from '../'
import type { InputCallback } from '../types.js'
import { globalProps } from '../utilities/globalProps.js'

type TextareaProps = {
  children?: array<React.ReactChild>,
  className?: string,
  data?: string,
  disabled?: boolean,
  error?: string,
  id?: string,
  label?: string,
  method?: string,
  minLength?: number,
  maxLength?: number,
  name?: string,
  object?: string,
  onChange?: InputCallback<HTMLTextAreaElement>,
  placeholder?: string,
  required?: boolean,
  resize: 'none' | 'both' | 'horizontal' | 'vertical',
  rows?: number,
  value?: string,
}

const Textarea = ({
  className,
  children,
  disabled,
  resize = 'none',
  error,
  label,
  minLength,
  maxLength,
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
            maxLength={maxLength}
            minLength={minLength}
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
              text={error}
          />
        </If>
      </If>
    </div>
  )
}

export default Textarea
