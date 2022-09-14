import React from 'react'

import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import DatePicker from '../_date_picker'

const DatePickerPositions = (props) => (
  <React.Fragment>
    <Flex>
      <FlexItem fixedSize="50%">
        <DatePicker
            label="Datepicker (opens on the right)"
            pickerId="date-picker-positions1"
            position="auto right"
            scrollContainer=".pb--page--content--main"
            staticPosition={false}
            {...props}
        />
      </FlexItem>
    </Flex>
    <Flex>
      <FlexItem fixedSize="50%">
        <DatePicker
            label="Datepicker (opens on the left)"
            pickerId="date-picker-positions2"
            position="auto left"
            scrollContainer=".pb--page--content--main"
            staticPosition={false}
            {...props}
        />
      </FlexItem>
    </Flex>
    <Flex>
      <FlexItem fixedSize="50%">
        <DatePicker
            label="Datepicker (opens above on the left)"
            pickerId="date-picker-positions3"
            position="above left"
            scrollContainer=".pb--page--content--main"
            staticPosition={false}
            {...props}
        />
      </FlexItem>
    </Flex>
    <Flex>
      <FlexItem fixedSize="50%">
        <DatePicker
            label="Datepicker (opens below on the right)"
            pickerId="date-picker-positions4"
            position="below right"
            scrollContainer=".pb--page--content--main"
            staticPosition={false}
            {...props}
        />
      </FlexItem>
    </Flex>
  </React.Fragment>
)

export default DatePickerPositions
