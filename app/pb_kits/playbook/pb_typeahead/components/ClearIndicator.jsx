/* @flow */

import React, { useEffect } from 'react'
import { components } from 'react-select'

const ClearContainer = (props: any) => {
  useEffect(() => {
    document.addEventListener('pb-typeahead-kit:clear', props.clearValue)
  }, true)

  return (
    <components.ClearIndicator
        className="clear_indicator"
        {...props}
    />
  )
}

export default ClearContainer
