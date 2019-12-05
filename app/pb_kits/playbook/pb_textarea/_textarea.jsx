import React from 'react'
import classnames from 'classnames'
import { Caption } from '../'

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
}

const textareaCSS =({
    dark=false,
}: TextareaProps) => {
  const themeStyle = dark === true ? '_dark' : ''
  return 'pb_textarea_kit' + themeStyle
}

const Textarea = (props: TextareaProps) => {

  const {
    className,
    children,
    label,
    placeholder,
    value,
    dark=false,
    rows=4,
    name,
  } = props

  const textarea_input = `${textareaCSS(props)}`

  return (
    <div className={classnames(textareaCSS(props), className)}>
      <Caption
          dark={dark}
          text={label}
      />
      <If condition={children}>
        {children}
        <Else />
        <textarea
            className={textarea_input}
            name={name}
            placeholder={placeholder}
            rows={rows}
            value={value}
        />
      </If>
    </div>
  )
}

export default Textarea
