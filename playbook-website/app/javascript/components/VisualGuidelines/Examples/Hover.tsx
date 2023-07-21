import React from 'react'
import {
  Body,
  Button,
  Caption,
  Card,
  Flex,
  FlexItem,
  Icon,
} from 'playbook-ui'

import Example from '../Templates/Example'

const ZINDEX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const hoverDescription = (
  <>
    <Body
        text="Adding our hover prop is usefull for easily customizing UI for kit ineractions."
    />
    <Button
        link="https://codesandbox.io/s/playbook-global-hover-prop-example-forked-mhssmm?file=/src/App.js"
        newWindow
        padding="none"
        tabIndex={0}
        variant="link"
    >
      <Body
          variant="link"
      >
        {'See this prop in action in our sample UI'}
        <Icon
            fixedWidth
            icon="angle-right"
        />
      </Body>
    </Button>
  </>
)

const Hover = ({ example }: { example: string }) => (
  <React.Fragment>
    <Example
        description={hoverDescription}
        example={example}
        globalProps={{
          hover: ZINDEX,
        }}
        // globalPropsDescription={globalPropsDescription}
        title="Hover"
    />

    <Card
        marginTop="sm"
        shadow="deep"
    >
      <Flex
          gap="sm"
          orientation="column"
          wrap
      >
        <FlexItem>
          <Caption
              text="Visual Guide"
          />
        </FlexItem>
        <FlexItem>
          <Body
              text="Hover over any card below to view hover property."
          />
        </FlexItem>
      </Flex>
    </Card>
  </React.Fragment>
)

export default Hover
