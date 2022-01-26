import React, { useState } from 'react'

import Background from '../_background'
import Select from '../../pb_select/_select'
import FlexItem from '../../pb_flex/_flex_item'
import Flex from '../../pb_flex/_flex'
import Button from '../../pb_button/_button'
import Title from '../../pb_title/_title'

const BackgroundTransition = (props) => {
  const [transition, setTransition] = useState('')
  const [apply, setApply] = useState({
    imageUrl: '',
    transition: '',
  })

  const loadImage = () => {
    document.querySelector('.background').classList.remove(transition, 'lazyloaded')
    setApply({
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
            alt="colorful background"
            className="background"
            imageUrl="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            transition={apply.transition}
            {...props}
        >
          <Flex
              orientation="column"
              vertical="center"
              {...props}
          >
            <FlexItem>
              <Title
                  dark
                  padding="lg"
                  size={1}
                  text="Background Kit Transition"
                  {...props}
              />
            </FlexItem>
          </Flex>
        </Background>
      </div>
    </>
  )
}

export default BackgroundTransition
