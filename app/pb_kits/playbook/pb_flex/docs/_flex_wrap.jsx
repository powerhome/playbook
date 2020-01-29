import React from 'react'
import { Body, Flex, FlexItem, Title } from  '../..'

const FlexWrap = () => {
  return (
    <>
      <Body
          text="Resize your browser"
      />
      <Title
          size={4}
          text="Wrap"
      />
      <br />
      <Flex
          className="bg_light"
          wrap
      >
        <FlexItem fixedSize="300px">
          {'1'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'2'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'3'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'4'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'5'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'6'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'7'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'8'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'9'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'10'}
        </FlexItem>
      </Flex>

      <br />
      <Title
          size={4}
          text="No Wrap"
      />
      <br />
      <Flex className="bg_light wide">
        <FlexItem fixedSize="300px">
          {'1'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'2'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'3'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'4'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'5'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'6'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'7'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'8'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'9'}
        </FlexItem>
        <FlexItem fixedSize="300px">
          {'10'}
        </FlexItem>
      </Flex>

    </>
  )
}

export default FlexWrap
