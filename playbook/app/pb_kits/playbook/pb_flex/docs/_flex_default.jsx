import React from 'react'
import { Flex, FlexItem, Title } from  '../../'

const FlexDefault = (props) => {
  return (
    <>

      <Title
          size={4}
          text="Row"
          {...props}
      />
      <br />
      <div className="flex-doc-example">
        <Flex
            orientation="row"
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
      <br />
      <Title
          size={4}
          text="Column"
          {...props}
      />
      <br />
      <div className="flex-doc-example">
        <Flex
            align="start"
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

export default FlexDefault
