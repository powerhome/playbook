import React, { useState } from 'react'
import Background from "../../pb_background/_background"
import Card from "../../pb_card/_card"
import Flex from "../../pb_flex/_flex"
import FlexItem from "../../pb_flex/_flex_item"
import Select from "../../pb_select/_select"
import Title from "../../pb_title/_title"

const BackgroundImage = (props) => {
  const [transition, setTransition] = useState('')

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
      <Background
          alt="colorful background"
          className="background lazyload"
          imageUrl="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
          transition={transition}
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
                text="Background Kit Image"
                {...props}
            />
          </FlexItem>
          <FlexItem
              padding="lg"
              {...props}
          >
            <Card
                shadow="deepest"
                {...props}
            >
              {
                'We cannot seek achievement for ourselves and forget about progress and prosperity for our community... Our ambitions must be broad enough to include the aspirations and needs of others, for their sakes and for our own. - Cesar Chavez'
              }
            </Card>
          </FlexItem>
        </Flex>
      </Background>
      <Flex marginTop="xl">
        <FlexItem fixedSize="250px">
          <Select
              blankSelection="Select a Transition..."
              label=""
              name="dropdown"
              onChange={handleTransition}
              options={options}
              transition={transition}
              {...props}
          />
        </FlexItem>
      </Flex>
    </>
  )
}

export default BackgroundImage
