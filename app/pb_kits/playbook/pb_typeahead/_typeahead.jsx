/* @flow */

import React from 'react'

import Select from 'react-select'

type Props = {
  autoload?: boolean,
  autosize?: boolean,
  async?: boolean,
  disabled?: boolean,
  multi?: boolean,
}

const TypeAhead = ({
  autoload = false,
  autosize = false,
  async = false,
  disabled = false,
  multi = true,
}: Props) => {
  const ComponentTag = async ? Select.Async : Select

  return (
    <ComponentTag
        autoload={autoload}
        autosize={autosize}
        disabled={disabled}
        multi={multi}
    />
  )
}

export default TypeAhead
