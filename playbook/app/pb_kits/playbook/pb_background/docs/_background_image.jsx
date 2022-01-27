import React, { useState }  from 'react'
import { Background } from '../..'
import { Button, Card, Flex, FlexItem, Select, Title } from '../..'

const BackgroundImage = (props) => {
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
              {'We cannot seek achievement for ourselves and forget about progress and prosperity for our community... Our ambitions must be broad enough to include the aspirations and needs of others, for their sakes and for our own. - Cesar Chavez'}
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
              transition={apply.transition}
              {...props}
          />
        </FlexItem>
        <FlexItem>
          <Button
              disabled={transition === '' ? true : false}
              marginLeft="sm"
              onClick={loadImage}
              text="Add Lazyload"
              {...props}
          />
        </FlexItem>
      </Flex>
    </>

  )
}

export default BackgroundImage
