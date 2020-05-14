/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Caption } from '../'
import type { InputCallback } from '../types.js'

type TextareaProps = {
  className?: String,
  children?: Array<React.ReactChild>,
  data?: String,
  error?: String,
  id?: String,
  object?: String,
  method?: String,
  label?: String,
  placeholder?: String,
  value?: String,
  name?: String,
  rows?: Number,
  dark?: Boolean,
  resize: 'none' | 'both' | 'horizontal' | 'vertical',
  onChange?: InputCallback<HTMLTextAreaElement>,
}

const Textarea = ({
  className,
  children,
  dark = false,
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
  const textareaClass = `pb_textarea_kit${dark ? '_dark' : ''}`
  const errorClass = error ? 'error' : null
  const resizeClass = ` resize_${resize}`

  return (
    <div className={classnames(textareaClass, className, errorClass, resizeClass)}>
      <Caption
          dark={dark}
          text={label}
      />
      <If condition={children}>
        {children}
        <Else />
        <textarea
            {...props}
            className={textareaClass}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            value={value}
        />
        <If condition={error}>
          <Body
              dark={dark}
              status="negative"
              text={error}
          />
        </If>
      </If>
    </div>
  )
}

export default Textarea
