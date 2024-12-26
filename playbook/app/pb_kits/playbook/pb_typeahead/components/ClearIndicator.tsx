import React, { useEffect } from 'react'
import { components } from 'react-select'

import { ClearIndicatorProps } from 'react-select'

const ClearContainer = (props: ClearIndicatorProps<unknown>): JSX.Element => {
  const { selectProps, clearValue } = props
  useEffect(() => {
    document.addEventListener(`pb-typeahead-kit-${selectProps.id}:clear`, clearValue)
  })

  return (
    <components.ClearIndicator
        className="clear_indicator"
        {...props}
    />
  )
}

export default ClearContainer
