import React from 'react'
import { Flex, FlexItem, Title } from  '../..'

const FlexReverse = () => {
  return (
    <>
      <div className="flex-doc-example">
        <Title
            size={4}
            text="Row"
        />
        <br />
        <Flex
            className="bg_light"
            horizontal="left"
            orientation="row"
            reverse
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
            orientation="column"
            reverse
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
      </div>
    </>
  )
}

export default FlexReverse
