import React from 'react'
import classnames from 'classnames'
import { Caption } from "../"

type TextareaProps = {
  className?: String,
  data?: String,
  id?: String,
  label?: String,
  placeholder?: String,
  value?: String,
  rows?: Number,
  dark?: Boolean,
}

const textareaCSS =({
    dark=false,
}: TextareaProps) => {
  const themeStyle = dark === true ? '_dark' : ''
  return 'pb_textarea_kit' + themeStyle
}

const Textarea = ( props: TextareaProps) => {

  const {
    className,
    label,
    placeholder,
    value,
    dark=false,
    rows = 4,
  } = props

  const textarea_input = `${textareaCSS(props)} form-control`
  
  return (
    <div className={classnames(textareaCSS(props), className)}>
      <Caption text={label} dark={dark}/>
      <textarea className={textarea_input}
        placeholder={placeholder}
        rows={rows}>
        {value}
      </textarea>
    </div>
  )
}

export default Textarea
