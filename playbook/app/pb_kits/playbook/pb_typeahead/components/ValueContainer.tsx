import React from 'react'
import { components } from 'react-select'
import Body from '../../pb_body/_body'

type ValueContainerProps = {
  children: React.ReactNode | React.ReactNode[],
  selectProps?: Record<string, unknown>,
  hasValue?: boolean,
}

const ValueContainer = (props: ValueContainerProps | any): React.ReactElement => {
  const { children, selectProps, hasValue } = props
  const inputDisplay = (selectProps as any)?.inputDisplay
  const value = (selectProps as any)?.value

  // When inputDisplay is "none" and there are selected values, show count text (this is for multi-select only)
  if (inputDisplay === 'none' && hasValue && value) {
    const selectedCount = Array.isArray(value) ? value.length : 0
    
    return (
      <components.ValueContainer 
          className="text_input_value_container"
          {...props}
      >
        <Body
            className="pb_typeahead_selection_count"
            text={`${selectedCount} item${selectedCount !== 1 ? 's' : ''} selected`}
        />
        {children}
      </components.ValueContainer>
    )
  }

  return (
    <components.ValueContainer 
        className="text_input_value_container"
        {...props}
    />
  )
}

export default ValueContainer
