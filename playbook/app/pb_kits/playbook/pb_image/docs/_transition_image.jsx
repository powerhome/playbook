import React, { useState } from 'react'

import Image from '../_image'
import Select from '../../pb_select/_select'
import FlexItem from '../../pb_flex/_flex_item'
import Flex from '../../pb_flex/_flex'
import Button from '../../pb_button/_button'

const TransitionImage = (props) => {
  const [transition, setTransition] = useState('')
  const [apply, setApply] = useState({
    url: '',
    transition: '',
  })

  const loadImage = () => {
    setApply({
      url: 'https://unsplash.it/500/400/?image=634',
      transition: transition,
    })
  }

  const handleTransition = ({ target }) => {
    setTransition(target.value)
  }

  const options = [
    {
      value: 'fade',
    },
    {
      value: 'blur',
    },
    {
      value: 'scale',
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
        <FlexItem>
          <Button
              disabled={transition === '' ? true : false}
              marginLeft="sm"
              onClick={loadImage}
              text="Load Image"
              {...props}
          />
        </FlexItem>
      </Flex>
      <div style={{ display: apply.url === '' ? 'none' : 'block' }}>
        <Image
            alt="picture of a misty forest"
            transition={apply.transition}
            url={apply.url}
            {...props}
        />
      </div>
    </>
  )
}

export default TransitionImage
