import React, { useState } from 'react'

import Background from '../_background'
import Select from '../../pb_select/_select'
import FlexItem from '../../pb_flex/_flex_item'
import Flex from '../../pb_flex/_flex'
import Button from '../../pb_button/_button'

const BackgroundTransition = (props) => {
  const [transition, setTransition] = useState('')
  const [apply, setApply] = useState({
    imageUrl: '',
    transition: '',
  })

  const loadImage = () => {
    document.querySelector('.background').classList.remove(transition, 'lazyloaded')
    setApply({
      imageUrl: 'https://unsplash.it/500/400/?image=634',
      transition: transition,
    },
    document.querySelector('.background').classList.add(transition, 'lazyload')
    )
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
      <div style={{ display: apply.imageUrl === '' ? 'none' : 'block' }}>
        <Background
            alt="picture of a misty forest"
            className="background"
            imageUrl={apply.imageUrl}
            transition={apply.transition}
            {...props}
        />
      </div>
    </>
  )
}

export default BackgroundTransition
