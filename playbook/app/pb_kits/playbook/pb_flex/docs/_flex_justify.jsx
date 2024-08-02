import React from 'react'
import { Flex, FlexItem, Title } from 'playbook-ui'

const FlexJustify = (props) => {
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
            justify="start"
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
      <div className="flex-doc-example">
        <Flex
            justify="center"
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
      <div className="flex-doc-example">
        <Flex
            justify="end"
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
      <div className="flex-doc-example tall">
        <Flex
            align="start"
            className="bg_light tall"
            justify="start"
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
      <div className="flex-doc-example tall">
        <Flex
            align="start"
            className="bg_light tall"
            justify="center"
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
      <div className="flex-doc-example tall">
        <Flex
            align="start"
            className="bg_light tall"
            justify="end"
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

export default FlexJustify
