import React, { useEffect } from 'react'
import { components } from 'react-select'

// Always mounted — ClearIndicator unmounts when empty, so :set after :clear lives here.
const IndicatorsContainer = (props: any): React.ReactElement => {
  const { selectProps, setValue } = props

  useEffect(() => {
    if (!selectProps?.id) return

    const handleSet = (event: Event) => {
      const detail = (event as CustomEvent).detail
      const value = selectProps.isMulti
        ? (Array.isArray(detail) ? detail : [detail]).filter(Boolean)
        : (Array.isArray(detail) ? detail[0] : detail) ?? null
      setValue(value, 'select-option')
    }

    const eventName = `pb-typeahead-kit-${selectProps.id}:set`
    document.addEventListener(eventName, handleSet)
    return () => document.removeEventListener(eventName, handleSet)
  }, [setValue, selectProps?.id, selectProps?.isMulti])

  return (
    <components.IndicatorsContainer
        className="text_input_indicators"
        {...props}
    />
  )
}

export default IndicatorsContainer
