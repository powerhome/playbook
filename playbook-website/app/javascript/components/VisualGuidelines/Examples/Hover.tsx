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

const shadowArr = ['deep', 'deeper', 'deepest']
const scaleObj = { 'sm': '@1.05', 'md': '@1.10', 'lg': '@1.15' }

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
        marginTop="md"
        shadow="deep"
    >
      <Flex
          orientation="column"
          wrap
      >
        <FlexItem paddingBottom="xs">
          <Caption
              text="Visual Guide"
          />
        </FlexItem>
        <FlexItem>
          <Body
              text="Hover over any card below to view hover property."
          />
        </FlexItem>
        <FlexItem paddingY="sm">
          <Flex
              gap="sm"
              wrap
          >
            <Card
                hover={{ background: 'success_subtle' }}
                padding="xs"
            >
              <Body
                  text="background color*"
              />
            </Card>
            {shadowArr.map((value) => {
              return (
                <Card
                    hover={{ shadow: value }}
                    key={value}
                    padding="xs"
                >
                  <Body
                      text={`shadow ${value}`}
                  />
                </Card>
              )
            })}
            {Object.entries(scaleObj).map(([key, value]) => {
              return (
                <Card
                    hover={{ scale: key }}
                    key={key}
                    padding="xs"
                >
                  <Flex align="center">
                    <Body
                        paddingRight="xxs"
                        text={`scale ${key}`}
                    />
                    <Caption
                        size="xs"
                        text={value}
                    />
                  </Flex>
                </Card>
              )
            })}
          </Flex>
        </FlexItem>
        <FlexItem>
          <Caption
              size="xs"
              text="*background accepts any color token"
          />
        </FlexItem>
      </Flex>
    </Card>
  </React.Fragment>
)

export default Hover
