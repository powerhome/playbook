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
}

const Textarea = ( props: TextareaProps) => {

  const {
    className,
    label,
    placeholder,
    value
  } = props

  const css = classnames([
    'pb_text_input_kit',
    className,
  ])

  const textarea_input ='pb_textarea_kit_textarea_input form-control'
  
  return (
    <div className={css, className}>
      <Caption text={label}/>
      <textarea className={textarea_input}
        placeholder={placeholder}
        rows={4}>
        {value}
      </textarea>
    </div>
  )
}

export default Textarea
