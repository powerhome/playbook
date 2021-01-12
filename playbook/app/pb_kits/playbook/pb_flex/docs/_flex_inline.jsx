import React from 'react'
import { Flex, FlexItem, Title } from  '../..'

const FlexInline = (props) => {
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
            inline
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
            inline
            orientation="column"
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

export default FlexInline
