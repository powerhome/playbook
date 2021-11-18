import React, { useState } from 'react'

import Image from '../_image'
import Select from '../../pb_select/_select'
import FlexItem from '../../pb_flex/_flex_item'
import Flex from '../../pb_flex/_flex'

const TransitionImage = (props) => {
  const [transition, setTransition] = useState('')
  const handleTransition = ({ target }) => setTransition(target.value)

  const options = [
    {
      value: 'fade',
      text: 'fade',
    },
    {
      value: 'blur',
      text: 'blur',
    },
    {
      value: 'scale',
      text: 'scale',
    },
  ]

  return (
    <>
      <Flex>
        <FlexItem fixedSize="250px">
          <Select
              blankSelection="Select a Transition..."
              label=""
              onChange={handleTransition}
              options={options}
              {...props}
          />
        </FlexItem>
      </Flex>
      <Image
          alt="picture of a misty forest"
          transition={transition}
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
      <br />
    </>
  )
}

export default TransitionImage

