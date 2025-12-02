import React, { useEffect } from 'react'
import { components } from 'react-select'

type ClearContainerProps = {
  children: React.ReactNode,
  selectProps?: {
    id: string,
  },
  clearValue: () => void,
  innerProps?: any,
}

const ClearContainer = (props: ClearContainerProps | any): React.ReactElement => {
  const { selectProps, clearValue, innerProps } = props
  useEffect(() => {
    document.addEventListener(`pb-typeahead-kit-${selectProps.id}:clear`, clearValue)
  }, [clearValue, selectProps.id])

  // To stop this from bubbling up when inside a dialog or other modal
  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation()
    innerProps?.onMouseDown?.(event)
  }

  return (
    <components.ClearIndicator
        className="clear_indicator"
        {...props}
        innerProps={{
          ...innerProps,
          onMouseDown: handleMouseDown,
        }}
    />
  )
}

export default ClearContainer
