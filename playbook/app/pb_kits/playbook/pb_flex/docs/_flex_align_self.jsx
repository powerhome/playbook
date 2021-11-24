import React from 'react'
import { Flex, FlexItem, Title } from  '../../'

const FlexAlignSelf = (props) => {
  return (
    <>
      <Title
          size={4}
          text="Row"
          {...props}
      />

      <br />

      <div className="flex-doc-example ">
        <Flex
            {...props}
        >
          <FlexItem alignSelf="start">
            {'1'}
          </FlexItem>
          <FlexItem padding="md">
            {'2'}
          </FlexItem>
          <FlexItem padding="md">
            {'3'}
          </FlexItem>
          <FlexItem padding="md">
            {'4'}
          </FlexItem>
        </Flex>
      </div>

      <br />

      <div className="flex-doc-example ">
        <Flex
            {...props}
        >
          <FlexItem alignSelf="end">
            {'1'}
          </FlexItem>
          <FlexItem padding="md">
            {'2'}
          </FlexItem>
          <FlexItem padding="md">
            {'3'}
          </FlexItem>
          <FlexItem padding="md">
            {'4'}
          </FlexItem>
        </Flex>
      </div>

      <br />

      <div className="flex-doc-example ">
        <Flex
            {...props}
        >
          <FlexItem alignSelf="center">
            {'1'}
          </FlexItem>
          <FlexItem padding="md">
            {'2'}
          </FlexItem>
          <FlexItem padding="md">
            {'3'}
          </FlexItem>
          <FlexItem padding="md">
            {'4'}
          </FlexItem>
        </Flex>
      </div>

      <br />

      <div className="flex-doc-example ">
        <Flex
            {...props}
        >
          <FlexItem alignSelf="stretch">
            {'1'}
          </FlexItem>
          <FlexItem padding="md">
            {'2'}
          </FlexItem>
          <FlexItem padding="md">
            {'3'}
          </FlexItem>
          <FlexItem padding="md">
            {'4'}
          </FlexItem>
        </Flex>
      </div>

      <br />
      <br />

      <Title
          size={4}
          text="Column"
          {...props}
      />

      <br />

      <div className="flex-doc-example ">
        <Flex
            orientation="column"
            {...props}
        >
          <FlexItem
              alignSelf="start"
              padding="sm"
          >
            {'1'}
          </FlexItem>
          <FlexItem padding="sm">
            {'2'}
          </FlexItem>
          <FlexItem padding="sm">
            {'3'}
          </FlexItem>
          <FlexItem padding="sm">
            {'4'}
          </FlexItem>
        </Flex>
      </div>

      <br />

      <div className="flex-doc-example ">
        <Flex
            orientation="column"
            {...props}
        >
          <FlexItem
              alignSelf="end"
              padding="sm"
          >
            {'1'}
          </FlexItem>
          <FlexItem padding="sm">
            {'2'}
          </FlexItem>
          <FlexItem padding="sm">
            {'3'}
          </FlexItem>
          <FlexItem padding="sm">
            {'4'}
          </FlexItem>
        </Flex>
      </div>

      <br />

      <div className="flex-doc-example ">
        <Flex
            orientation="column"
            {...props}
        >
          <FlexItem
              alignSelf="center"
              padding="sm"
          >
            {'1'}
          </FlexItem>
          <FlexItem padding="sm">
            {'2'}
          </FlexItem>
          <FlexItem padding="sm">
            {'3'}
          </FlexItem>
          <FlexItem padding="sm">
            {'4'}
          </FlexItem>
        </Flex>
      </div>

      <br />

      <div className="flex-doc-example ">
        <Flex
            orientation="column"
            {...props}
        >
          <FlexItem
              alignSelf="stretch"
              padding="sm"
          >
            {'1'}
          </FlexItem>
          <FlexItem padding="sm">
            {'2'}
          </FlexItem>
          <FlexItem padding="sm">
            {'3'}
          </FlexItem>
          <FlexItem padding="sm">
            {'4'}
          </FlexItem>
        </Flex>
      </div>

    </>
  )
}

export default FlexAlignSelf
