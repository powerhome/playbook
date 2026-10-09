import React from 'react'

import DatePicker from '../_date_picker'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import Title from '../../pb_title/_title'

const DatePickerDefault = (props) => (
  <div>
    <Title marginBottom="xs"
        text="Regular Date Picker in 'Squished' Configuration"
    />
    <Flex direction="row" 
        gap="none"
        maxWidth="xs"
    >
      <FlexItem>
        <DatePicker
            label="hellohellohello default"
            pickerId="date-picker-default"
            {...props}
        />
      </FlexItem>
      <FlexItem>
        <DatePicker
            label="hellohellohello default"
            pickerId="date-picker-default-2"
            {...props}
        />
      </FlexItem>
    </Flex>
    <Flex direction="row"
        gap="none"
        maxWidth="xs"
    >
      <FlexItem>
        <DatePicker
            hideIcon
            label="hellohellohello hideicon"
            pickerId="date-picker-default-3"
            {...props}
        />
      </FlexItem>
      <FlexItem>
        <DatePicker
            hideIcon
            label="hellohellohello hideicon"
            pickerId="date-picker-default-4"
            {...props}
        />
      </FlexItem>
    </Flex>
    <Flex direction="row"
        gap="none"
        maxWidth="xs"
    >
      <FlexItem>
        <DatePicker
            inLine
            label="hellohellohello inlineinline"
            pickerId="date-picker-default-5"
            {...props}
        />
      </FlexItem>
      <FlexItem>
        <DatePicker
            inLine
            label="hellohellohello inlineinline"
            pickerId="date-picker-default-6"
            {...props}
        />
      </FlexItem>
    </Flex>
  </div>
)

export default DatePickerDefault
