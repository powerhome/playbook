import React from 'react'
import { Flex, FlexItem, Title } from  '../..'

const FlexReverse = (props) => {
  return (
    <>
      <div className="flex-doc-example">
        <Title
            size={4}
            text="Row"
            {...props}
        />
        <br />
        <Flex
            className="bg_light"
            horizontal="left"
            orientation="row"
            reverse
            {...props}
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
            {...props}
        />
        <br />
        <Flex
            className="bg_light"
            orientation="column"
            reverse
            vertical="left"
            {...props}
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
