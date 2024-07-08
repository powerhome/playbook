import React, { useEffect } from 'react'
import { components } from 'react-select'

const ClearContainer = (props: any): React.ReactElement => {
  const { selectProps, clearValue } = props
  useEffect(() => {
    document.addEventListener(`pb-typeahead-kit-${selectProps.id}:clear`, clearValue)
  }, [])

  return (
    <components.ClearIndicator
        className="clear_indicator"
        {...props}
    />
  )
}

export default ClearContainer
