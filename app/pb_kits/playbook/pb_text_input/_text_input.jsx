/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type TextInputProps = {
  className?: String,
  data?: String,
  disabled?: Boolean,
  error?: Boolean,
  id?: String,
  label?: String,
  name?: String,
  placeHolder?: String,
  value?: String,
  
}

const TextInput = ({ className, data, disabled, error, id, label, name, placeHolder, value }: TextInputProps) => (
  <div>
    {`kit content`}
  </div>
)

export default TextInput
