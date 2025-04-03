import React from 'react'
import Background from "../../pb_background/_background"
import Flex from "../../pb_flex/_flex"
import FlexItem from "../../pb_flex/_flex_item"
import Title from "../../pb_title/_title"

const BackgroundOverlay = (props) => {
  return (
    <Background
        alt="colorful background"
        className="background lazyload"
        imageOverlay="opacity_6"
        imageUrl="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
        {...props}
        backgroundColor="light"
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
        </Flex>
      </Background>
  )
}

export default BackgroundOverlay
