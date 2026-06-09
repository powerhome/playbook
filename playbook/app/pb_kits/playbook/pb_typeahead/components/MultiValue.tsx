import React from 'react'
import { components } from 'react-select'

import { SelectValueType } from '../_typeahead'
import PillRenderer from './PillRenderer'

type Props = {
  data: SelectValueType,
  multiValueTemplate: any,
  wrapped?: boolean,
  pillColor?: "primary" | "neutral" | "success" | "warning" | "error" | "info" | "data_1" | "data_2" | "data_3" | "data_4" | "data_5" | "data_6" | "data_7" | "data_8" | "windows" | "siding" | "roofing" | "doors" | "gutters" | "solar" | "insulation" | "accessories",
  removeProps: any,
  selectProps: any,
  isFocused?: boolean,
  index?: number,
}

const isPillReorderActive = (selectProps: Record<string, unknown>): boolean => {
  return Boolean(
    selectProps?.enablePillReorder
    && selectProps?.isMulti
    && selectProps?.inputDisplay === 'pills'
  )
}

const MultiValue = (props: Props) => {
  const { removeProps, isFocused, index = 0 } = props
  const { dark, multiKit, pillColor, truncate, wrapped, inputDisplay, showPillIndex, value } = props.selectProps

  // If inputDisplay is "none", don't render the pill/badge, just return null (the count handled in ValueContainer file)
  if (inputDisplay === 'none') {
    return null
  }

  // Pills are rendered in ValueContainer when drag reorder is enabled
  if (isPillReorderActive(props.selectProps)) {
    return null
  }

  const totalCount = Array.isArray(value) ? value.length : 0

  return (
    <components.MultiValueContainer
        className="text_input_multivalue_container"
        {...props}
    >
      <PillRenderer
          dark={dark}
          data={props.data}
          index={index}
          isFocused={isFocused}
          multiKit={multiKit}
          pillColor={pillColor}
          removeProps={removeProps}
          selectProps={props.selectProps}
          showPillIndex={showPillIndex}
          totalCount={totalCount}
          truncate={truncate}
          wrapped={wrapped}
      />
    </components.MultiValueContainer>
  )
}

export default MultiValue
