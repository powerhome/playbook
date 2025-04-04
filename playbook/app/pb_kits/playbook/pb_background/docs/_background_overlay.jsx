import React from 'react'
import Background from "../../pb_background/_background"
import Flex from "../../pb_flex/_flex"
import FlexItem from "../../pb_flex/_flex_item"
import Title from "../../pb_title/_title"

const BackgroundOverlay = (props) => {
  return (
    <Background
        alt="colorful background"
        backgroundColor="category_21"
        className="background lazyload"
        imageOverlay="opacity_2"
        imageUrl="https://unsplash.it/500/400/?image=633"
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
            />
          </FlexItem>
        </Flex>
      </Background>
  )
}

export default BackgroundOverlay
