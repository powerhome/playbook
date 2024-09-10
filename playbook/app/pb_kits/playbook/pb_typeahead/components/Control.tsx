import React from 'react'
import { components } from 'react-select'

import Flex from '../../pb_flex/_flex'
import TextInput from '../../pb_text_input/_text_input'


type Props = {
  selectProps: any,
}

const TypeaheadControl = (props: Props) => {
  const { selectProps } = props
  const { dark, error, label } = selectProps

  return (
    <div className="pb_typeahead_wrapper">
      <TextInput
          dark={dark}
          error={error}
          label={label}
          marginBottom="none"
      >
        <Flex>
          <components.Control
              className="text_input"
              {...props}
          />
        </Flex>
      </TextInput>
    </div>
  )
}

export default TypeaheadControl
