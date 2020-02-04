import React from 'react'
import { Flex, FlexItem, Title } from  '../../'

const FlexDefault = () => {
  return (
    <>
      <Title
          size={4}
          text="Row"
      />
      <br />
      <Flex
          orientation="row"
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
          orientation="column"
          vertical="left"
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

export default FlexDefault
