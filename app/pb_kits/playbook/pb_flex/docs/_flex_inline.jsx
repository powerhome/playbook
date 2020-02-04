import React from 'react'
import { Flex, FlexItem, Title } from  '../..'

const FlexInline = () => {
  return (
    <>
      <Title
          size={4}
          text="Row"
      />
      <br />
      <Flex
          className="bg_light"
          inline
      >
        <FlexItem>
          {'1'}
        </FlexItem>
        <FlexItem>
          {'2'}
        </FlexItem>
        <FlexItem>
          {'3'}
        </FlexItem>
        <FlexItem>
          {'4'}
        </FlexItem>
      </Flex>

      <br />
      <Title
          size={4}
          text="Column"
      />
      <br />
      <Flex
          className="bg_light"
          inline
          orientation="column"
      >
        <FlexItem>
          {'1'}
        </FlexItem>
        <FlexItem>
          {'2'}
        </FlexItem>
        <FlexItem>
          {'3'}
        </FlexItem>
        <FlexItem>
          {'4'}
        </FlexItem>
      </Flex>

    </>
  )
}

export default FlexInline
