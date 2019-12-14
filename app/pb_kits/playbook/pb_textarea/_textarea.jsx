/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Caption } from '../'
import { type InputCallback } from '../types.js'

type TextareaProps = {
  className?: String,
  children?: Array<React.ReactChild>,
  data?: String,
  id?: String,
  object?: String,
  method?: String,
  label?: String,
  placeholder?: String,
  value?: String,
  name?: String,
  rows?: Number,
  dark?: Boolean,
  onChange?: InputCallback,
}

const Textarea = ({
  className,
  children,
  label,
  onChange = () => {},
  placeholder,
  value,
  dark = false,
  rows = 4,
  name,
}: TextareaProps) => {
  const textareaClass = `pb_textarea_kit${dark ? '_dark' : ''}`

  return (
    <div className={classnames(textareaClass, className)}>
      <Caption
          dark={dark}
          text={label}
      />
      <If condition={children}>
        {children}
        <Else />
        <textarea
            className={textareaClass}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            value={value}
        />
      </If>
    </div>
  )
}

export default Textarea
