import React, { useRef, useEffect, useState } from 'react'

import Card from '../../pb_card/_card'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import DatePicker from '../_date_picker'

const DatePickerPositionsElement = (props) => {
  const cardRefTop = useRef(null),
        cardRefBtm = useRef(null)

  const [cardTop, setCardTop] = useState()
  const [cardBtm, setCardBtm] = useState()

  useEffect(() => {
    setCardTop(cardRefTop.current)
    setCardBtm(cardRefBtm.current)
  }, [cardTop, cardBtm])

  return (
    <React.Fragment>
      <div ref={cardRefTop}>
        <Card
            marginBottom="md"
        >
          {'👋 Datepicker will position from here based on ID.'}
        </Card>
      </div>
      <Flex>
        <FlexItem fixedSize="50%">
          <DatePicker
              label="Datepicker (opens on the right)"
              pickerId="date-picker-position-element"
              position="auto right"
              positionElement={cardTop}
              scrollContainer=".pb--page--content--main"
              staticPosition={false}
              {...props}
          />
        </FlexItem>
      </Flex>

      <div ref={cardRefBtm}>
        <Card
            marginBottom="md"
        >
            {'👋 Datepicker will position from here based on class name.'}
        </Card>
      </div>
      <Flex>
        <FlexItem fixedSize="50%">
          <DatePicker
              label="Datepicker (opens on the right)"
              pickerId="date-picker-position-element2"
              position="auto right"
              positionElement={cardBtm}
              scrollContainer=".pb--page--content--main"
              staticPosition={false}
              {...props}
          />
        </FlexItem>
      </Flex>
    </React.Fragment>
  )
}

export default DatePickerPositionsElement
