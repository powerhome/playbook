import React from 'react'
import { Flex, FlexItem, Title } from 'playbook-ui'

const FlexAlign = (props) => {
  return (
    <>

      <Title
          size={4}
          text="row"
          {...props}
      />
      <br />

      <div className="flex-doc-example ">
        <Flex
            align="start"
            {...props}
        >
          <FlexItem>
            {'1'}
          </FlexItem>
          <FlexItem>
            {'2'}
          </FlexItem>
          <FlexItem padding="xl">
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
            align="center"
            {...props}
        >
          <FlexItem>
            {'1'}
          </FlexItem>
          <FlexItem>
            {'2'}
          </FlexItem>
          <FlexItem padding="xl">
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
            align="end"
            {...props}
        >
          <FlexItem>
            {'1'}
          </FlexItem>
          <FlexItem>
            {'2'}
          </FlexItem>
          <FlexItem padding="xl">
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
            align="stretch"
            orientation="row"
            {...props}
        >
          <FlexItem>
            {'1'}
          </FlexItem>
          <FlexItem>
            {'2'}
          </FlexItem>
          <FlexItem padding="xl">
            {'3'}
          </FlexItem>
          <FlexItem padding="md">
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

      <div className="flex-doc-example ">
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

      <br />

      <div className="flex-doc-example ">
        <Flex
            align="center"
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

      <br />

      <div className="flex-doc-example ">
        <Flex
            align="end"
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

      <br />

      <div className="flex-doc-example ">
        <Flex
            align="stretch"
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

export default FlexAlign
