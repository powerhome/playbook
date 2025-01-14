import React from 'react'
import { components } from 'react-select'

import Flex from '../../pb_flex/_flex'
import TextInput from '../../pb_text_input/_text_input'

type Props = {
    selectProps: {
    dark?: boolean,
    label: string,
    error?: string,
  },
}

const TypeaheadControl = (props: Props) => (
  <div className="pb_typeahead_wrapper">
    <TextInput
        dark={props.selectProps.dark}
        error={props.selectProps.error}
        label={props.selectProps.label}
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

export default TypeaheadControl
