import React, { useEffect } from 'react'
import { components } from 'react-select'

type ClearContainerProps = {
  children: React.ReactNode,
  selectProps?: {
    id: string,
  },
  clearValue: () => void,
}

const ClearContainer = (props: ClearContainerProps): React.ReactElement => {
  const { selectProps, clearValue } = props
  useEffect(() => {
    document.addEventListener(`pb-typeahead-kit-${selectProps.id}:clear`, clearValue)
  }, [clearValue, selectProps.id])

  return (
    <components.ClearIndicator
        className="clear_indicator"
        {...props}
    />
  )
}

export default ClearContainer
